<template>
  <div class="shadow-xl rounded-lg">
    <v-card flat>
      <div class="grid grid-cols-1 md:grid-cols-2 align-center gap-4 p-4">
        <div>Danh sách sản phẩm</div>

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
            class="font-bold bg-gray-100 p-2 text-sm rounded-lg text-gray-darken-2 text-center max-w-[150px] m-auto"
          >
            Không hoạt động
          </div>
          <div
            v-if="item.status === 1"
            class="font-bold bg-blue-50 p-2 text-sm rounded-lg text-blue-darken-4 text-center max-w-[150px] m-auto"
          >
            Hoạt động
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="getProductDetails(item)" class="text-blue-darken-4">
            mdi:mdi-eye
          </v-icon>
        </template>
      </v-data-table>
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="2"
        next-icon="mdi:mdi-menu-right"
        prev-icon="mdi:mdi-menu-left"
      ></v-pagination>
    </v-card>
    <v-dialog max-width="800" v-model="dialogDetail">
      <v-card>
        <v-card-text>
          <div class="bg-white rounded-lg">
            <div class="text-right" @click="dialogDetail = false">
              <span
                class="mdi mdi-close cursor-pointer font-bold text-2xl"
              ></span>
            </div>
            <v-carousel
              v-if="dataSelected.files.length > 0"
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
                v-for="(item, index) in dataSelected.files"
                :key="index"
              >
                <img
                  :src="API_URL + item.path"
                  class="m-auto max-h-[400px] h-[100%]"
              /></v-carousel-item>
            </v-carousel>
            <div class="text-center text-xl font-bold my-4">
              Chi tiết sản phẩm
            </div>
            <v-row>
              <v-col cols="6"> Tên sản phẩm </v-col>
              <v-col cols="6">
                {{ dataSelected.name }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6"> Thời hạn bảo hành </v-col>
              <v-col cols="6"> {{ dataSelected.monthGuarantee }} tháng </v-col>
            </v-row>
            <v-row>
              <v-col cols="6"> Mô tả chi tiết </v-col>
              <v-col cols="6">
                {{ dataSelected.description }}
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
const API_URL = import.meta.env.VITE_API_URL;
export default {
  name: "CustomerProductPage",
  data() {
    return {
      API_URL,
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
      dialogDetail: false,
      dataSelected: null,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["windowReSize"]),
  },
  methods: {
    ...mapActions(useBaseStore, ["getListProduct", "getCusProductDetail"]),
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
      this.getListProduct("public/product/search", paramsSearch).then(
        (resp) => {
          if (resp) {
            this.items = resp.data.data;
            this.pageCount = resp.data.totalPage;
          }
        }
      );
    },
    getProductDetails(data) {
      this.getCusProductDetail(`public/product/${data.id}`).then((resp) => {
        if (resp) {
          this.dialogDetail = true;
          this.dataSelected = resp.data;
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
</style>