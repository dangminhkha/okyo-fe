<template>
  <div class="bg-white p-3 rounded-lg" v-if="dataDetail">
    <div class="grid gap-4">
      <div class="text-center">
        <v-carousel
          v-if="imageList.length > 0"
          hide-delimiters
          hide-delimiter-background
          height="300"
          :cycle="true"
          :interval="6000"
        >
          <template v-slot:prev="{ props }">
            <div
              class="w-[50px] h-[50px] bg-gray-100 flex justify-center items-center shadow-2xl rounded-full"
              @click="props.onClick"
            >
              <span class="mdi mdi-arrow-left w-[40px]"></span>
            </div>
          </template>
          <template v-slot:next="{ props }">
            <div
              class="w-[50px] h-[50px] bg-gray-100 flex justify-center items-center shadow-2xl rounded-full"
              @click="props.onClick"
            >
              <span class="mdi mdi-arrow-right w-[40px]"></span>
            </div>
          </template>
          <v-carousel-item
            cover
            v-for="(item, index) in imageList"
            :key="index"
          >
            <img :src="item" class="m-auto max-h-[400px] h-[100%]"
          /></v-carousel-item>
        </v-carousel>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 px-4">
        <div>{{ dataDetail.name }}</div>
        <div>Thời hạn BH {{ dataDetail.monthGuarantee }} tháng</div>
      </div>
      <v-card flat>
        <div class="grid grid-cols-1 md:grid-cols-2 align-center gap-4 p-4">
          <div class="font-bold">Danh sách bảo hành</div>
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
            @click="addGuarantee()"
          >
            <span class="mdi mdi-plus"></span>Thêm BH
          </div>
        </div>
        <v-divider></v-divider>
        <v-data-table
          :headers="headers"
          :items="guaranteeData"
          :page="page"
          :items-per-page="itemsPerPage"
          item-value="name"
          hide-default-footer
          :mobile="windowReSize.x < 768"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-chip
              color="red-darken-4"
              variant="flat"
              v-if="item.status === 'EXPIRED'"
              size="small"
            >
              Hết hạn BH
            </v-chip>
            <v-chip
              color="green-darken-4"
              variant="flat"
              v-if="item.status === 'NOT_SOLD'"
              size="small"
            >
              Chưa có BH
            </v-chip>
            <v-chip
              color="blue-darken-4"
              variant="flat"
              v-if="item.status === 'SOLD'"
              size="small"
            >
              Còn BH
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="min-w-[60px]">
              <v-icon
                @click="getGuaranteeDetails(item)"
                class="text-blue-darken-4"
              >
                mdi-eye
              </v-icon>
              <v-icon
                v-if="item.status === 'NOT_SOLD'"
                @click="removeGuaranteeDetails(item)"
                class="text-red-darken-4 ml-3"
              >
                mdi-close-circle-outline
              </v-icon>
            </div>
          </template>
        </v-data-table>
        <v-pagination
          v-model="page"
          :length="pageCount"
          :total-visible="5"
          next-icon="mdi-menu-right"
          prev-icon="mdi-menu-left"
        ></v-pagination>
      </v-card>
    </div>
  </div>
  <GuaranteeDetailVue
    v-if="dialogDetail"
    :status="dialogDetail"
    :id="dialogDetailId"
    @close="dialogDetail = $event"
  />
  <v-dialog v-model="dialogRemove" max-width="500">
    <div class="bg-white py-3 px-5 rounded-lg">
      <div class="text-right" @click="dialogRemove = false">
        <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
      </div>
      <div class="grid gap-3">
        <div class="text-center text-xl font-bold">Xác nhận xóa bảo hành?</div>
        <v-btn variant="flat" color="blue-darken-4" class="w-3/5 m-auto mt-5"
          >Xác nhận</v-btn
        >
      </div>
    </div>
  </v-dialog>
  <v-dialog v-model="addGuaranteeDialog" max-width="500" persistent>
    <div class="bg-white p-4 rounded-lg">
      <div class="text-right" @click="addGuaranteeDialog = false">
        <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
      </div>

      <div class="text-center text-xl font-bold mb-4">
        Thêm mã bảo hành cho sản phẩm
      </div>
      <v-form
        ref="form"
        v-model="valid"
        @submit.prevent="submitAddGuarantee"
        class="grid gap-3"
      >
        <v-text-field
          label="Mã bảo hành"
          variant="outlined"
          v-model="code"
          :rules="rulesRequired"
        >
        </v-text-field>
      </v-form>
      <div class="flex justify-center my-4">
        <v-btn variant="flat" color="blue-darken-4" @click="submitAddGuarantee">
          Xác nhận
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../stores/baseStore";
import GuaranteeDetailVue from "./sections/GuaranteeDetail.vue";
export default {
  name: "ProductDetailPage",
  components: { GuaranteeDetailVue },
  data() {
    return {
      valid: false,
      addGuaranteeDialog: false,
      dataDetail: null,
      guaranteeData: [],
      imageList: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      headers: [
        {
          title: "Mã sản phẩm",
          align: "start",
          key: "code",
        },
        {
          title: "Tên KH",
          align: "center",
          key: "customerName",
        },
        {
          title: "Sđt KH",
          align: "center",
          key: "customerPhone",
        },
        {
          title: "Email KH",
          align: "center",
          key: "customerEmail",
        },
        {
          title: "Ngày hết hạn BH",
          align: "center",
          key: "endDate",
        },
        {
          title: "Trạng thái",
          align: "start",
          key: "status",
        },

        { title: "", key: "actions", align: "end", sortable: false },
      ],
      code: null,
      rulesRequired: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
      dialogDetail: false,
      dialogDetailId: null,
      dialogRemove: false,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["windowReSize"]),
  },
  methods: {
    ...mapActions(useBaseStore, [
      "detailsProduct",
      "getListGuarantee",
      "getImageFromId",
      "addGuaranteeToProduct",
    ]),
    getImageUrl(id) {
      this.getImageFromId(`public/file`, { id: id }).then((resp) => {
        if (resp) {
          // resp.data.rep

          this.imageList.push(
            "data:" + resp.data.contentType + ";base64," + resp.data.base64
          );
        }
      });
    },
    getDetails(id) {
      this.detailsProduct(`admin/product/${id}`).then((resp) => {
        if (resp) {
          this.dataDetail = resp.data;
          this.imageList = [];
          this.dataDetail.files.map((item) => {
            this.getImageUrl(item.fileId);
          });
        }
      });
    },
    getGuarantee(id) {
      this.getListGuarantee(`admin/guarantee/product/${id}`).then((resp) => {
        if (resp) {
          this.guaranteeData = resp.data;
          this.pageCount = resp.data.totalPage;
        }
      });
    },
    addGuarantee() {
      this.addGuaranteeDialog = true;
    },
    async submitAddGuarantee() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          productId: this.dataDetail.id,
          code: this.code,
        };
        this.addGuaranteeToProduct("admin/guarantee", params).then((resp) => {
          if (resp) {
            this.getDetails(this.dataDetail.id);
            this.getGuarantee(this.dataDetail.id);
            this.addGuaranteeDialog = false;
          }
        });
      }
    },
    getGuaranteeDetails(data) {
      this.dialogDetail = true;
      this.dialogDetailId = data.id;
    },
    removeGuaranteeDetails(data) {
      this.dialogRemove = true;
    },
  },
  created() {
    this.getDetails(this.$route.params.id);
    this.getGuarantee(this.$route.params.id);
  },
};
</script>

<style>
</style>