<template>
  <div class="shadow-xl rounded-lg">
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        Danh sách bảo hành
        <v-spacer></v-spacer>

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
      </v-card-title>

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
          {{ item.status === "EXPIRED" ? "Hết hạn BH" : "Còn BH" }}
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
        prev-icon="fas fa-angle-double-left text-sm"
        next-icon="fas fa-angle-double-right text-sm"
      >
      </v-pagination>
    </v-card>
  </div>
  <v-dialog v-model="dialogDetail" max-width="500">
    <div class="bg-white py-3 px-5 rounded-lg">
      <div class="text-right" @click="dialogDetail = false">
        <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
      </div>
      <div class="grid gap-3">
        <div class="text-center text-xl font-bold">Chi tiết bảo hành</div>

        <div class="">
          <div class="flex justify-between my-1">
            <div>Tên SP</div>
            <div>{{ dataSelected.product.name }}</div>
          </div>
          <div class="flex justify-between my-1">
            <div>Mô tả</div>
            <div>{{ dataSelected.product.description }}</div>
          </div>
          <div class="flex justify-between my-1">
            <div>Thời hạn BH</div>
            <div>{{ dataSelected.product.monthGuarantee }} tháng</div>
          </div>
        </div>
        <div class="my-1 font-bold">Cập nhật thông tin khách hàng</div>
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="submitEdit"
          class="grid gap-3"
        >
          <v-text-field
            label="Tên khách hàng"
            variant="outlined"
            v-model="customerName"
            :rules="rulesRequired"
          >
          </v-text-field>
          <v-text-field
            label="Sđt khách hàng"
            variant="outlined"
            v-model="customerPhone"
            :rules="rulesRequired"
          >
          </v-text-field>
          <v-text-field
            label="Email khách hàng"
            variant="outlined"
            v-model="customerEmail"
            :rules="customerEmail ? rulesEmail : []"
          >
          </v-text-field>
        </v-form>
        <v-btn variant="flat" color="blue-darken-3" @click="submitEdit">
          Xác nhận
        </v-btn>
      </div>
    </div>
  </v-dialog>
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
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../stores/baseStore";
export default {
  name: "BaoHanhPage",
  data() {
    return {
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
      items: [],
      dialogDetail: false,
      dataSelected: null,
      dialogRemove: false,
      customerName: null,
      customerPhone: null,
      customerEmail: null,
      endDate: null,
      todayDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      rulesRequired: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập thông tin";
        },
      ],
      valid: false,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["windowReSize"]),
    rulesEmail() {
      const rules = [];
      const rule2 = (value) =>
        (value &&
          /^[a-z][a-z0-9_\.-]{2,}@[a-z0-9]{2,}(\.[a-z0-9]{1,}){1,2}$/.test(
            value
          )) ||
        "Vui lòng nhập đúng định dạng email";
      rules.push(rule2);
      return rules;
    },
  },
  methods: {
    ...mapActions(useBaseStore, [
      "getListGuaranteeAdmin",
      "getGuaranteeDetail",
    ]),
    async submitEdit() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
      }
    },
    searchDara() {
      this.page = 1;
      this.getData();
    },
    getData() {
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
      };
      this.getListGuaranteeAdmin("admin/guarantee/search", paramsSearch).then(
        (resp) => {
          if (resp) {
            this.items = resp.data.data;
            this.pageCount = resp.data.totalPage;
          }
        }
      );
    },
    getGuaranteeDetails(data) {
      this.getGuaranteeDetail(`admin/guarantee/${data.id}`).then((resp) => {
        if (resp) {
          this.dialogDetail = true;
          this.dataSelected = resp.data;
        }
      });
    },
    removeGuaranteeDetails(data) {
      this.dialogRemove = true;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>