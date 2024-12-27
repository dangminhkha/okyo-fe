<template>
  <div class="shadow-xl rounded-lg">
    <v-card flat>
      <v-card-title>
        <v-row>
          <v-col cols="12" md="6" class="text-blue-darken-4 font-bold uppercase"
            >Danh sách sản phẩm</v-col
          >
          <v-col cols="12" md="6"
            ><v-text-field
              v-model="search"
              density="compact"
              label="Tìm kiếm"
              class="h-[48px]"
              prepend-inner-icon="mdi:mdi-magnify"
              variant="solo-filled"
              flat
              hide-details
              single-line
              @click:prepend-inner="searchDara()"
            ></v-text-field
          ></v-col>
        </v-row>
      </v-card-title>
      <div class="grid grid-cols-1 md:grid-cols-2 align-center gap-4 p-4"></div>
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
        :hide-default-header="windowReSize.x < 768"
      >
        <template v-slot:[`item.id`]="{ item, index }">
          <div class="cursor-pointer">
            <span class="hidden">{{ item.id }}</span
            >{{ index + 1 }}
          </div>
        </template>
        <template v-slot:[`item.name`]="{ item }">
          <div class="md:max-w-[300px] md:truncate md:cursor-pointer">
            <v-tooltip activator="parent" location="top">{{
              item.name
            }}</v-tooltip>
            {{ item.name }}
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <div
            v-if="item.status === 0 || !item.status"
            class="font-bold p-2 text-sm rounded-lg text-center max-w-[150px] m-auto"
          >
            <span class="mdi mdi-circle text-2xl text-gray-500"></span>
          </div>
          <div
            v-if="item.status === 1"
            class="font-bold p-2 text-sm rounded-lg text-center max-w-[150px] m-auto"
          >
            <span class="mdi mdi-circle text-2xl text-green-500"></span>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="getProductDetails(item)" class="text-blue-darken-4">
            mdi:mdi-eye
          </v-icon>
          <v-icon @click="updateProduct(item)" class="text-blue-darken-4 ml-3">
            mdi:mdi-pencil
          </v-icon>
          <v-icon @click="removeProduct(item)" class="text-red-darken-4 ml-3">
            mdi:mdi-close-circle-outline
          </v-icon>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="5"
        next-icon="mdi:mdi-menu-right"
        prev-icon="mdi:mdi-menu-left"
      ></v-pagination>
    </v-card>
  </div>
  <v-dialog v-model="dialogRemove" max-width="500">
    <div class="bg-white py-3 px-5 rounded-lg">
      <div class="text-right" @click="dialogRemove = false">
        <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
      </div>
      <div class="grid gap-3">
        <div class="text-center text-xl font-bold">Xác nhận xóa sản phẩm?</div>
        <v-btn
          variant="flat"
          color="blue-darken-4"
          class="w-3/5 m-auto mt-5"
          @click="removeConfirm()"
          >Xác nhận</v-btn
        >
      </div>
    </div>
  </v-dialog>
  <v-dialog v-model="addProductDialog" max-width="800" persistent>
    <v-card>
      <v-card-text>
        <div class="bg-white p-4 rounded-lg">
          <div class="flex justify-between items-center mb-4">
            <div
              class="text-center text-xl font-bold text-blue-darken-4 uppercase"
            >
              Thêm sản phẩm
            </div>
            <div class="text-right" @click="addProductDialog = false">
              <span
                class="mdi mdi-close cursor-pointer font-bold text-2xl"
              ></span>
            </div>
          </div>
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="submitAddProduct"
            class="grid"
          >
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Tên sản phẩm"
                  variant="outlined"
                  v-model="name"
                  :rules="rulesRequired"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  label="Loại sản phẩm"
                  :items="typeList"
                  v-model="typeSelected"
                  variant="outlined"
                  item-title="name"
                  item-value="id"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" md="4">
                <v-text-field
                  type="number"
                  inputmode="numeric"
                  label="Thời hạn BH"
                  variant="outlined"
                  v-model="monthGuarantee"
                  :rules="rulesRequired"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6" md="4">
                <v-checkbox v-model="status" label="Hoạt động"></v-checkbox>
              </v-col>
              <v-col cols="6" md="4"
                ><v-checkbox v-model="outstanding" label="Nổi bật"></v-checkbox
              ></v-col>
            </v-row>
            <span class="mdi mdi-plus cursor-pointer my-1" @click="addDetail()"
              ><span class="text-sm">Đặc điểm nổi bật</span></span
            >
            <v-row>
              <v-col cols="12" v-for="(item, index) in listDetail" :key="index">
                <v-text-field
                  variant="outlined"
                  v-model="detailsModel"
                  append-inner-icon="mdi:mdi-check-circle"
                  @click:append-inner="acceptAddDetail(detailsModel)"
                >
                </v-text-field>
              </v-col>
            </v-row>
            {{ details }}
            <Editor v-model="description" editorStyle="height: 200px"> </Editor>

            <div class="flex justify-between border p-3 rounded-lg">
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
          <div class="flex justify-center my-6">
            <v-btn
              variant="flat"
              color="blue-darken-4"
              @click="submitAddProduct"
            >
              Xác nhận
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog max-width="800" v-model="dialogUpdate">
    <div class="bg-white p-4 rounded-lg">
      <div class="flex justify-between items-center mb-4">
        <div class="text-center text-xl font-bold text-blue-darken-4 uppercase">
          Cập nhật sản phẩm
        </div>
        <div class="text-right" @click="dialogUpdate = false">
          <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
        </div>
      </div>
      <v-form
        ref="formEdit"
        v-model="valid"
        @submit.prevent="editConfirm"
        class="grid gap-3"
      >
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Tên sản phẩm"
              variant="outlined"
              v-model="name"
              :rules="rulesRequired"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              label="Loại sản phẩm"
              :items="typeList"
              v-model="typeSelected"
              variant="outlined"
              item-title="name"
              item-value="id"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" md="4"
            ><v-text-field
              type="number"
              inputmode="numeric"
              label="Thời hạn BH"
              variant="outlined"
              v-model="monthGuarantee"
              :rules="rulesRequired"
            >
            </v-text-field
          ></v-col>
          <v-col cols="6" md="4"
            ><v-checkbox v-model="status" label="Hoạt động"></v-checkbox
          ></v-col>
          <v-col cols="6" md="4"
            ><v-checkbox v-model="outstanding" label="Nổi bật"></v-checkbox
          ></v-col>
        </v-row>
        <Editor v-model="description" editorStyle="height: 200px"> </Editor>

        <div class="flex justify-between border p-3 rounded-lg">
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
                  v-else-if="listImg[index].path"
                  width="50"
                  :src="listImg[index].path"
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
        <v-btn variant="flat" color="blue-darken-4" @click="editConfirm">
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
const API_URL = import.meta.env.VITE_API_URL;
import Editor from "primevue/editor";
export default {
  name: "DashboardPage",
  components: { Editor },
  data() {
    return {
      dialogRemove: false,
      removeData: null,
      API_URL,
      imageAvatar,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      headers: [
        {
          title: "STT",
          align: "start",
          key: "id",
          sortable: false,
        },
        {
          title: "Tên sản phẩm",
          align: "start",
          key: "name",
          sortable: false,
        },
        {
          title: "Trạng thái",
          align: "center",
          key: "status",
          sortable: false,
        },
        {
          title: "Thời gian BH",
          align: "center",
          key: "monthGuarantee",
          sortable: false,
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
      status: true,
      listImg: [
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
      ],
      dialogUpdate: false,
      productEdit: null,
      typeList: [],
      typeSelected: null,
      outstanding: false,
      listDetail: [""],
      detailsModel: null,
      details: [],
    };
  },
  methods: {
    ...mapActions(useBaseStore, [
      "getListProduct",
      "addProductAction",
      "addFileAction",
      "updateProductAction",
      "snackChange",
      "removeProductAction",
      "getListProductType",
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
      this.status = true;
      this.name = null;
      this.monthGuarantee = null;
      this.description = null;
      this.typeSelected = null;
      this.outstanding = false;
      this.listImg = [
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
      ];
    },
    async submitAddProduct() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let fileList = [];
        this.listImg.map((item) => {
          if (item.id) {
            fileList.push({ id: item.id });
          }
        });

        let params = {
          name: this.name,
          monthGuarantee: this.monthGuarantee,
          description: this.description,
          status: this.status ? 1 : 0,
          files: fileList,
          productTypeId: this.typeSelected,
          outstanding: this.outstanding ? 1 : 0,
        };
        this.addProductAction("admin/product", params).then((resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Thêm sản phẩm thành công",
              color: "blue",
            });
            this.getProducts();
            this.addProductDialog = false;
          }
        });
      }
    },
    removeImgList(index) {
      this.listImg[index] = { id: null, base64: null, path: null };
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
    updateProduct(data) {
      this.listImg = [
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
        { id: null, base64: null, path: null },
      ];
      this.dialogUpdate = true;
      this.productEdit = data;
      this.status = this.productEdit.status === 1 ? true : false;
      this.name = this.productEdit.name;
      this.monthGuarantee = this.productEdit.monthGuarantee;
      this.description = this.productEdit.description;
      this.typeSelected = this.productEdit.productTypeId;
      this.productEdit.files.map((item, index) => {
        this.listImg[index].path = API_URL + item.path;
        this.listImg[index].id = item.id;
      });
      this.outstanding = this.productEdit.outstanding === 1 ? true : false;
    },

    async editConfirm() {
      const { valid } = await this.$refs.formEdit.validate();
      if (valid) {
        let fileList = [];
        this.listImg.map((item) => {
          if (item.id) {
            fileList.push({ id: item.id });
          }
        });

        let params = {
          id: this.productEdit.id,
          name: this.name,
          monthGuarantee: this.monthGuarantee,
          description: this.description,
          status: this.status ? 1 : 0,
          files: fileList,
          productTypeId: this.typeSelected,
          outstanding: this.outstanding ? 1 : 0,
        };
        this.updateProductAction("admin/product", params).then((resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Cập nhật thông tin thành công",
              color: "blue",
            });
            this.dialogUpdate = false;
            this.getProducts();
            this.status = false;
            this.name = null;
            this.monthGuarantee = null;
            this.description = null;
            this.outstanding = false;
          }
        });
      }
    },
    removeProduct(data) {
      this.dialogRemove = true;
      this.removeData = data;
    },
    removeConfirm() {
      this.removeProductAction(`admin/product/${this.removeData.id}`).then(
        (resp) => {
          if (resp) {
            this.snackChange({
              status: true,
              message: "Xóa sản phẩm thành công",
              color: "blue",
            });
            this.dialogRemove = false;
            this.getProducts();
          }
        }
      );
    },
    addDetail() {
      this.listDetail.push("");
    },
    acceptAddDetail(data) {
      this.details.push(data);
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
    this.getListProductType("public/product-type").then((resp) => {
      if (resp) {
        this.typeList = resp.data;
      }
    });
  },
};
</script>

<style></style>