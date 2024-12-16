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
          prepend-inner-icon="mdi:mdi-magnify"
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
        <template v-slot:[`item.product.name`]="{ item }">
          <div class="md:max-w-[100px] md:truncate md:cursor-pointer">
            <v-tooltip activator="parent" location="top">{{
              item.product.name
            }}</v-tooltip>
            {{ item.product.name }}
          </div>
        </template>
        <template v-slot:[`item.customerName`]="{ item }">
          <div class="md:max-w-[100px] md:truncate md:cursor-pointer">
            <v-tooltip activator="parent" location="top">{{
              item.customerName
            }}</v-tooltip>
            {{ item.customerName }}
          </div>
        </template>
        <template v-slot:[`item.customerEmail`]="{ item }">
          <div class="md:max-w-[100px] md:truncate md:cursor-pointer">
            <v-tooltip activator="parent" location="top">{{
              item.customerEmail
            }}</v-tooltip>
            {{ item.customerEmail }}
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
              class="text-blue-darken-4"
            >
              mdi:mdi-eye
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
      >
      </v-pagination>
    </v-card>
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
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../stores/baseStore";
import GuaranteeDetailVue from "./sections/GuaranteeDetail.vue";
export default {
  name: "BaoHanhPage",
  components: { GuaranteeDetailVue },
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      headers: [
        {
          title: "Mã BH",
          align: "start",
          key: "code",
        },
        {
          title: "Tên SP",
          align: "center",
          key: "product.name",
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
      dialogDetailId: null,
      dialogRemove: false,
      dataSelected: null,
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
      "removeGuaranteeAction",
      "snackChange",
    ]),
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
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
      this.dialogDetail = true;
      this.dialogDetailId = data.id;
    },
    removeGuaranteeDetails(data) {
      this.dialogRemove = true;
      this.dataSelected = data;
    },
    removeConfirm() {
      this.removeGuaranteeAction(
        `admin/guarantee/${this.dataSelected.id}`
      ).then((resp) => {
        if (resp) {
          this.snackChange({
            status: true,
            message: "Xóa bảo hành thành công",
            color: "blue",
          });
          this.dialogRemove = false;
          this.getData();
        }
      });
    },
    updateDone() {
      this.dialogDetail = false;
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>