<template>
  <div class="shadow-xl rounded-lg">
    <v-card flat>
      <div class="grid grid-cols-1 md:grid-cols-2 align-center gap-4 p-4">
        <div>Danh sách sản phẩm</div>

        <v-text-field
          v-model="search"
          density="compact"
          label="Tìm kiếm"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
          @click:prepend-inner="searchDara()"
        ></v-text-field>
      </div>
      <div class="p-4">
        <div
          class="flex justify-center items-center p-3 rounded-lg text-sm bg-blue-darken-4 h-[40px] w-[165px] cursor-pointer"
          @click="addProduct()"
        >
          <span class="mdi mdi-plus"></span>Thêm sản phẩm
        </div>
      </div>
      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="items"
        :page="page"
        :items-per-page="itemsPerPage"
        item-value="name"
        hide-default-footer
        :mobile="windowReSize.x < 768"
      >
        <template v-slot:[`item.status`]="{ item }">
          <div v-if="item.status === 0 || !item.status" class="font-bold bg-gray-100 p-2 text-sm rounded-lg text-gray-darken-2">Không hoạt động</div>
          <div v-if="item.status === 1" class="font-bold bg-blue-50 p-2 text-sm rounded-lg text-blue-darken-4">Hoạt động</div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            size="small"
            @click="getProductDetails(item)"
            class="text-blue-darken-4"
          >
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="2"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      ></v-pagination>
    </v-card>
  </div>
  <v-dialog v-model="addProductDialog" max-width="500" persistent>
    <div class="bg-white p-4 rounded-lg">
      <div class="text-right" @click="addProductDialog = false">
        <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
      </div>

      <div class="text-center text-xl font-bold mb-4">Thêm sản phẩm</div>

      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="submitAddProduct"
        class="grid gap-3"
      >
        <v-text-field
          label="Tên sản phẩm"
          variant="outlined"
          v-model="name"
          :rules="rulesRequired"
        >
        </v-text-field>
        <v-text-field
          type="number"
          inputmode="numeric"
          label="Thời hạn BH"
          variant="outlined"
          v-model="monthGuarantee"
          :rules="rulesRequired"
        >
        </v-text-field>
        <v-textarea
          label="Mô tả sản phẩm"
          variant="outlined"
          density="comfortable"
          v-model="description"
          auto-grow
        >
        </v-textarea>
        <v-checkbox v-model="status" label="Trạng thái"></v-checkbox>
        <div class="flex justify-between">
          <span v-for="(item, index) in listImg" :key="index">
            <v-badge color="gray-500">
              <template v-slot:badge>
                <span class="mdi mdi-close" @click="removeImgList(index)">
                </span>
              </template>
              <v-avatar rounded="lg" size="64">
                <img
                  v-if="listImg[index].base64"
                  width="50"
                  :src="listImg[index].base64"
                  @click="uploadFile('upload' + index)"
                />
                <img
                  v-else
                  width="50"
                  :src="imageAvatar"
                  @click="uploadFile('upload' + index)"
                />
                <input
                  hidden
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  :ref="'upload' + index"
                  @change="affterRenderImg($event, index)"
                />
              </v-avatar>
            </v-badge>
          </span>
        </div>
      </v-form>
      <div class="flex justify-center my-4">
        <v-btn variant="flat" color="blue-darken-4" @click="submitAddProduct">
          Xác nhận
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../stores/baseStore";
import imageAvatar from "@/assets/images/uploader.png";
import JQuery from "jquery";
export default {
  name: "DashboardPage",
  components: {},
  data() {
    return {
      imageAvatar,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      headers: [
        {
          title: "Tên sản phẩm",
          align: "start",
          key: "name",
        },
        {
          title: "Trạng thái",
          align: "center",
          key: "status",
        },
        {
          title: "Thời gian BH",
          align: "center",
          key: "monthGuarantee",
        },
        { title: "", key: "actions", sortable: false },
      ],
      items: [],
      filterParams: {},
      addProductDialog: false,
      valid: false,
      rulesRequired: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
      name: null,
      monthGuarantee: null,
      description: null,
      status: 0,
      listImg: [
        { id: null, base64: null },
        { id: null, base64: null },
        { id: null, base64: null },
        { id: null, base64: null },
        { id: null, base64: null },
      ],
    };
  },
  methods: {
    ...mapActions(useBaseStore, [
      "getListProduct",
      "addProductAction",
      "addFileAction",
    ]),
    filterOnlyCapsText(value, query, item) {
      return (
        value != null &&
        query != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(query) !== -1
      );
    },
    searchDara() {
      this.page = 1;
      this.getProducts();
    },
    getProducts() {
      let paramsSearch = {
        page: this.page,
        size: this.itemsPerPage,
        filters: [
          {
            fieldCode: "NAME",
            operator: "LIKE",
            value: this.search,
          },
        ],
        sorts: [
          {
            fieldCode: "ID",
            typeSort: "DESC",
          },
        ],
      };
      this.getListProduct("admin/product/search", paramsSearch).then((resp) => {
        if (resp) {
          this.items = resp.data.data;
          this.pageCount = resp.data.totalPage;
        }
      });
    },
    getProductDetails(item) {
      this.$router.push({ path: `/sanpham/${item.id}` });
    },
    addProduct() {
      this.addProductDialog = true;
    },
    async submitAddProduct() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let fileList = [];
        this.listImg.map((item) => {
          if (item.base64) {
            fileList.push(item.id);
          }
        });

        let params = {
          name: this.name,
          monthGuarantee: this.monthGuarantee,
          description: this.description,
          status: this.status,
          files: fileList,
        };
        this.addProductAction("admin/product", params).then((resp) => {
          if (resp) {
            this.getProducts();
            this.addProductDialog = false;
          }
        });
      }
    },
    removeImgList(index) {
      this.listImg[index] = { id: null, base64: null };
    },
    uploadFile(ref) {
      this.$refs[ref][0].click();
    },
    affterRenderImg(d, index) {
      var input = d.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.resizeBase64Img(reader.result, 300, 300).then((base64) => {
            let payload = {
              extension: input.files[0].name.split(".")[1],
              contentType: input.files[0].type,
              size: input.files[0].size,
              base64: base64.replace(/^data:image\/[a-z]+;base64,/, ""),
            };
            this.addFileAction("admin/file", payload).then((resp) => {
              if (resp) {
                this.listImg[index].id = resp.data.id;
                this.listImg[index].base64 = base64;
              }
            });
          });
        };

        reader.onerror = function (error) {
          console.log("Update avatar failture.");
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    resizeBase64Img: function (base64, width, height) {
      let $ = JQuery;
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      var context = canvas.getContext("2d");
      var deferred = $.Deferred();

      var img = new Image();

      img.onload = function () {
        context.scale(width / this.width, height / this.height);
        context.drawImage(this, 0, 0);
        deferred.resolve(canvas.toDataURL());
      };
      img.src = base64;

      return deferred.promise();
    },
  },
  computed: {
    ...mapState(useBaseStore, ["windowReSize"]),
  },
  watch: {
    page(val) {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
</style>