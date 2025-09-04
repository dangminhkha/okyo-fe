<template>
  <div class="bg-white p-3 rounded-lg" v-if="dataDetail">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-3 border rounded-lg">
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
              <span class="mdi mdi-arrow-left"></span>
            </div>
          </template>
          <template v-slot:next="{ props }">
            <div
              class="w-[50px] h-[50px] bg-gray-100 flex justify-center items-center shadow-2xl rounded-full"
              @click="props.onClick"
            >
              <span class="mdi mdi-arrow-right"></span>
            </div>
          </template>
          <v-carousel-item
            cover
            v-for="(item, index) in imageList"
            :key="index"
          >
            <img
              :src="API_URL + item.path"
              class="m-auto max-h-[400px] h-[100%] hover:-translate-y-1 hover:scale-105 duration-300"
          /></v-carousel-item>
        </v-carousel>
        <div v-else>
          <img :src="imageAvatar" class="m-auto max-h-[360px] rounded-lg" />
        </div>
      </div>
      <div class="p-3 border rounded-lg">
        <div class="text-lg md:text-2xl font-bold text-gray-600">
          {{ dataDetail.name }}
        </div>
        <div class="customer-divide"></div>
        <div class="font-bold">
          Thời gian bảo hành: {{ dataDetail.monthGuarantee }} tháng
        </div>
        <div class="border-y my-3 text-sm py-2 text-gray-500">
          {{ dataDetail.productTypeName }}
        </div>
        <div v-if="dataDetail.details">
          <div class="font-bold text-xl my-3">Đặc điểm nổi bật</div>
          <ul class="list-disc list-inside">
            <li
              v-for="(item, index) in dataDetail.details"
              :key="index"
              class="text-gray-500"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="grid gap-4 mt-4">
      <div class="p-3 border rounded-lg" v-if="dataDetail.description">
        <div class="text-start mt-4 mb-2 text-blue-darken-4 text-2xl font-bold">
          Mô tả chi tiết
        </div>
        <div class="ql-editor" v-html="dataDetail.description"></div>
      </div>
      <v-card flat>
        <div class="grid grid-cols-1 md:grid-cols-2 align-center gap-4 p-4">
          <div class="font-bold">Danh sách bảo hành</div>
          <v-text-field
            v-model="search"
            density="compact"
            label="Tìm kiếm"
            prepend-inner-icon="mdi:mdi-magnify"
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
          :hide-default-header="windowReSize.x < 768"
        >
          <template v-slot:[`item.id`]="{ item, index }">
            <div class="cursor-pointer">
              <span class="hidden">{{ item.id }}</span
              >{{ index + 1 }}
            </div>
          </template>
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
              Chưa kích hoạt
            </v-chip>
            <v-chip
              color="blue-darken-4"
              variant="flat"
              v-if="item.status === 'SOLD'"
              size="small"
            >
              Đang BH
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <div class="min-w-[60px]">
              <v-icon
                @click="getGuaranteeDetails(item)"
                v-if="item.status !== 'NOT_SOLD'"
                class="text-blue-darken-4"
              >
                mdi:mdi-eye
              </v-icon>
              <v-icon
                @click="getGuaranteeDetails(item)"
                v-else
                class="text-blue-darken-4"
              >
                mdi:mdi-pencil
              </v-icon>
              <v-icon
                v-if="item.status === 'NOT_SOLD'"
                @click="removeGuaranteeDetails(item)"
                class="text-red-darken-4 ml-3"
              >
                mdi:mdi-close-circle-outline
              </v-icon>
            </div>
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
  </div>
  <GuaranteeDetailVue
    v-if="dialogDetail"
    :status="dialogDetail"
    :id="dialogDetailId"
    @close="dialogDetail = $event"
    @updateDone="updateDone"
  />
  <v-dialog v-model="dialogRemove" max-width="500">
    <div class="bg-white py-3 px-5 rounded-lg">
      <div class="text-right" @click="dialogRemove = false">
        <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
      </div>
      <div class="grid gap-3">
        <div class="text-center text-xl font-bold">Xác nhận xóa bảo hành?</div>
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
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              label="Đại lý BH"
              :items="agentData"
              v-model="agentSelected"
              variant="outlined"
              density="comfortable"
              item-title="name"
              item-value="id"
              return-object
              :rules="[rules.required]"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Mã bảo hành"
              variant="outlined"
              v-model="code"
              :rules="rulesRequired"
            >
            </v-text-field>
          </v-col>
        </v-row>
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
import imageAvatar from "@/assets/images/productDF.jpg";
const API_URL = import.meta.env.VITE_API_URL;
export default {
  name: "ProductDetailPage",
  components: { GuaranteeDetailVue },
  data() {
    return {
      imageAvatar,
      API_URL,
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
          title: "STT",
          align: "start",
          key: "id",
          sortable: false,
        },
        {
          title: "Mã sản phẩm",
          align: "center",
          key: "code",
          sortable: false,
        },
        {
          title: "Tên KH",
          align: "center",
          key: "customerName",
          sortable: false,
        },
        {
          title: "Sđt KH",
          align: "center",
          key: "customerPhone",
          sortable: false,
        },
        {
          title: "Email KH",
          align: "center",
          key: "customerEmail",
          sortable: false,
        },
        {
          title: "Ngày hết hạn BH",
          align: "center",
          key: "endDate",
          sortable: false,
        },
        {
          title: "Đại lí",
          align: "center",
          key: "salesAgent.name",
          sortable: false,
        },
        {
          title: "Trạng thái",
          align: "start",
          key: "status",
          sortable: false,
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
      idRemove: null,
      agentData: null,
      agentSelected: null,
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
      "removeGuaranteeAction",
      "snackChange",
      "getListAgent",
    ]),

    getDetails(id) {
      this.detailsProduct(`admin/product/detail?id=${id}`).then((resp) => {
        if (resp) {
          this.dataDetail = resp.data;
          this.imageList = resp.data.files;
        }
      });
    },
    searchDara() {
      this.getListGuarantee(
        `admin/guarantee/product/list?id=${this.$route.params.id}&code=${this.search}`
      ).then((resp) => {
        if (resp) {
          this.guaranteeData = resp.data;
          this.pageCount = resp.data.totalPage;
        }
      });
    },
    getGuarantee(id) {
      this.getListGuarantee(`admin/guarantee/product/list?id=${id}`).then(
        (resp) => {
          if (resp) {
            this.guaranteeData = resp.data;
            this.pageCount = resp.data.totalPage;
          }
        }
      );
    },
    addGuarantee() {
      this.addGuaranteeDialog = true;
      this.code = null;
    },
    async submitAddGuarantee() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        let params = {
          productId: this.dataDetail.id,
          code: this.code,
          salesAgentId: this.agentSelected.id,
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
    updateDone() {
      this.dialogDetail = false;
      this.getGuarantee(this.$route.params.id);
    },
    removeGuaranteeDetails(data) {
      this.dialogRemove = true;
      this.idRemove = data.id;
    },
    removeConfirm() {
      this.removeGuaranteeAction(
        `admin/guarantee/delete?id=${this.idRemove}`
      ).then((resp) => {
        if (resp) {
          this.snackChange({
            status: true,
            message: "Xóa bảo hành thành công",
            color: "blue",
          });
          this.dialogRemove = false;
          this.getGuarantee(this.$route.params.id);
        }
      });
    },
  },
  created() {
    this.getDetails(this.$route.params.id);
    this.getGuarantee(this.$route.params.id);
    this.getListAgent("admin/sales-agent/select").then((resp) => {
      if (resp) {
        this.agentData = resp.data;
      }
    });
  },
};
</script>

<style></style>