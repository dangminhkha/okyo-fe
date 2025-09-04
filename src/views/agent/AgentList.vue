<template>
  <div class="shadow-xl rounded-lg">
    <v-card flat>
      <v-card-title>
        <v-row>
          <v-col cols="12" md="3" class="text-blue-darken-4 font-bold uppercase">Danh sách đại lý</v-col>

          <v-col cols="12" md="3"><v-text-field v-model="search" density="compact" label="Tìm kiếm"
              prepend-inner-icon="mdi:mdi-magnify" variant="solo-filled" flat hide-details single-line
              @click:prepend-inner="searchDara()" class="h-[48px]"></v-text-field></v-col>

        </v-row>
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table :headers="headers" :items="items" :page="page" :items-per-page="itemsPerPage" item-value="name"
        hide-default-footer :mobile="windowReSize.x < 768" :hide-default-header="windowReSize.x < 768">
        <template v-slot:[`item.id`]="{ item, index }">
          <div class="cursor-pointer">
            <span class="hidden">{{ item.id }}</span>{{ index + 1 }}
          </div>
        </template>
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
          <div v-if="item.status === 0 || !item.status"
            class="font-bold p-2 text-sm rounded-lg text-center max-w-[150px] m-auto">
            <span class="mdi mdi-circle text-2xl text-gray-500"></span>
          </div>
          <div v-if="item.status === 1" class="font-bold p-2 text-sm rounded-lg text-center max-w-[150px] m-auto">
            <span class="mdi mdi-circle text-2xl text-green-500"></span>
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="min-w-[60px]">
            <v-icon @click="getGuaranteeDetails(item)" v-if="item.status !== 'NOT_SOLD'" class="text-blue-darken-4">
              mdi:mdi-eye
            </v-icon>
            <v-icon @click="getGuaranteeDetails(item)" v-else class="text-blue-darken-4">
              mdi:mdi-pencil
            </v-icon>
            <v-icon v-if="item.status === 'NOT_SOLD'" @click="removeGuaranteeDetails(item)"
              class="text-red-darken-4 ml-3">
              mdi:mdi-close-circle-outline
            </v-icon>
          </div>
        </template>
      </v-data-table>
      <v-pagination v-model="page" :length="pageCount" :total-visible="5" next-icon="mdi:mdi-menu-right"
        prev-icon="mdi:mdi-menu-left">
      </v-pagination>
    </v-card>
  </div>
  <GuaranteeDetailVue v-if="dialogDetail" :status="dialogDetail" :id="dialogDetailId" :agentData="agentData"
    @close="dialogDetail = $event" @updateDone="updateDone" />
  <v-dialog v-model="dialogRemove" max-width="500">
    <div class="bg-white py-3 px-5 rounded-lg">
      <div class="text-right" @click="dialogRemove = false">
        <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
      </div>
      <div class="grid gap-3">
        <div class="text-center text-xl font-bold">Xác nhận xóa bảo hành?</div>
        <v-btn variant="flat" color="blue-darken-4" class="w-3/5 m-auto mt-5" @click="removeConfirm()">Xác nhận</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
import GuaranteeDetailVue from "../sections/GuaranteeDetail.vue";
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
          title: "STT",
          align: "start",
          key: "id",
          sortable: false,
        },

        {
          title: "Tên đại lý",
          align: "start",
          key: "name",
          sortable: false,
        },
        {
          title: "Số điện thoại",
          align: "start",
          key: "phone",
          sortable: false,
        },
        {
          title: "Email",
          align: "start",
          key: "email",
          sortable: false,
        },
        {
          title: "Trạng thái",
          align: "center",
          key: "status",
          sortable: false,
        },

        { title: "", key: "actions", align: "end", sortable: false },
      ],
      items: [],
      dialogDetail: false,
      dialogDetailId: null,
      dialogRemove: false,
      dataSelected: null,
      agentData: null,
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
      "getListAgent",
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
            fieldCode: 'NAME',
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
      this.getListGuaranteeAdmin("admin/sales-agent/search", paramsSearch).then(
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
        `admin/guarantee/delete?id=${this.dataSelected.id}`
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
  watch: {
    page(val) {
      this.getData();
    },
    itemsStatusSelected(val) {
      this.getData();
    },
  },
  created() {
    this.getData();

  },
};
</script>

<style></style>