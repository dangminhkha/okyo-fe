<template>
  <div class="shadow-xl rounded-lg">
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        Danh sách sản phẩm
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
        :total-visible="5"
        prev-icon="fas fa-angle-double-left text-sm"
        next-icon="fas fa-angle-double-right text-sm"
      ></v-pagination>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../stores/baseStore";
export default {
  name: "DashboardPage",
  data() {
    return {
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
        {
          title: "Mô tả",
          align: "start",
          key: "description",
        },
        { title: "", key: "actions", sortable: false },
      ],
      items: [],
      filterParams: {},
    };
  },
  methods: {
    ...mapActions(useBaseStore, ["getListProduct"]),
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