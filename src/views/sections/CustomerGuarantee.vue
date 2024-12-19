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
        hide-default-header
        :mobile="windowReSize.x < 768"
      >
        <template v-slot:body="{ items }">
          <div v-if="items.length > 0">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 my-10">
              <div v-for="(item, index) in items" :key="index">
                <div
                  class="bg-white border p-3 rounded-lg shadow-xl hover:shadow-lg cursor-pointer"
                  @click="getGuaranteeDetails(item)"
                >
                  <div>
                    Mã BH:
                    <span class="text-blue-darken-4 font-bold">{{
                      item.code
                    }}</span>
                  </div>
                  <div class="text-blue-darken-4 font-bold">
                    {{ item.product.name }}
                  </div>
                  <div>
                    Tên KH:
                    <span class="text-blue-darken-4 font-bold">{{
                      item.customerName
                    }}</span>
                  </div>
                  <div>
                    SĐT KH:
                    <span class="text-blue-darken-4 font-bold">{{
                      item.customerPhone
                    }}</span>
                  </div>
                  <div>
                    Email KH:
                    <span class="text-blue-darken-4 font-bold">{{
                      item.customerEmail
                    }}</span>
                  </div>
                  <div>
                    Ngày hết hạn BH:
                    <span class="text-blue-darken-4 font-bold">{{
                      item.endDate
                    }}</span>
                  </div>
                  <div class="my-2">
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
                  </div>
                </div>
              </div>
            </div>
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
    <v-dialog v-model="dialogDetail" max-width="800" scrollable>
      <v-card>
        <v-card-text>
          <div class="bg-white rounded-lg">
            <div class="flex justify-between mb-4">
              <div class="text-center text-xl font-bold text-blue-darken-4">Chi tiết bảo hành</div>
              <div class="text-right" @click="dialogDetail = false">
                <span
                  class="mdi mdi-close cursor-pointer font-bold text-2xl"
                ></span>
              </div>
            </div>
            <div class="grid gap-3 border p-3 rounded-lg">
              <v-row>
                <v-col cols="6">Tên khách hàng</v-col>
                <v-col cols="6">{{ dataSelected.customerName }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">SĐT khách hàng</v-col>
                <v-col cols="6">{{ dataSelected.customerPhone }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">Email khách hàng</v-col>
                <v-col cols="6">{{ dataSelected.customerEmail }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">Tên sản phẩm</v-col>
                <v-col cols="6">{{ dataSelected.product.name }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">Thời hạn BH</v-col>
                <v-col cols="6"
                  >{{ dataSelected.product.monthGuarantee }} tháng</v-col
                >
              </v-row>
              <v-row>
                <v-col cols="6">Trạng thái</v-col>
                <v-col cols="6">
                  <v-chip
                    color="red-darken-4"
                    variant="flat"
                    v-if="dataSelected.status === 'EXPIRED'"
                    size="small"
                  >
                    Hết hạn BH
                  </v-chip>
                  <v-chip
                    color="green-darken-4"
                    variant="flat"
                    v-if="dataSelected.status === 'NOT_SOLD'"
                    size="small"
                  >
                    Chưa kích hoạt
                  </v-chip>
                  <v-chip
                    color="blue-darken-4"
                    variant="flat"
                    v-if="dataSelected.status === 'SOLD'"
                    size="small"
                  >
                    Đang BH
                  </v-chip></v-col
                >
              </v-row>
              <v-row>
                <v-col cols="6">Ngày bắt đầu BH</v-col>
                <v-col cols="6">{{ dataSelected.startDate }}</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">Ngày kết thúc BH</v-col>
                <v-col cols="6">{{ dataSelected.endDate }}</v-col>
              </v-row>
              <v-row v-if="dataSelected.description">
                <v-col cols="6">Mô tả</v-col>
                <v-col cols="6">{{ dataSelected.description }}</v-col>
              </v-row>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
export default {
  name: "CustomerGuaramteePage",
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 9,
      search: "",
      headers: [
        {
          title: "STT",
          align: "start",
          key: "id",
          sortable: false,
        },
        {
          title: "Mã BH",
          align: "center",
          key: "code",
          sortable: false,
        },
        {
          title: "Tên SP",
          align: "center",
          key: "product.name",
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
          title: "Trạng thái",
          align: "start",
          key: "status",
          sortable: false,
        },

        { title: "", key: "actions", align: "end", sortable: false },
      ],
      items: [],
      dialogDetail: false,
      dataSelected: null,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["windowReSize"]),
  },
  methods: {
    ...mapActions(useBaseStore, ["getListCusGuarantee", "cusDetail"]),
    searchDara() {
      this.page = 1;
      this.getData();
    },
    getData() {
      let paramsSearch = {
        page: this.page,
        size: this.itemsPerPage,
        searchValue: this.search,
      };
      this.getListCusGuarantee("public/guarantee", paramsSearch).then(
        (resp) => {
          if (resp) {
            this.items = resp.data.data;
            this.pageCount = resp.data.totalPage;
          }
        }
      );
    },
    getGuaranteeDetails(data) {
      this.cusDetail(`public/guarantee/${data.code}`).then((resp) => {
        if (resp) {
          this.dialogDetail = true;
          this.dataSelected = resp.data;
        }
      });
    },
  },
  watch: {
    page(val) {
      this.getData();
    },
  },
  created() {},
};
</script>

<style>
</style>