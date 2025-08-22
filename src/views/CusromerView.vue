<template>
  <div class="bg-gray-100 rounded-lg">
    <CustomerSliderVue />
    <div class="text-center font-bold text-2xl my-4 text-blue-darken-3">Sản phẩm nổi bật</div>
    <div class="max-w-screen-xl m-auto my-4 grid grid-cols-2 md:grid-cols-3 gap-3 justify-center p-3">
      <div v-for="(item, index) in items" :key="index"
        class="bg-white p-3 grid rounded-lg shadow-sm hover:shadow-xl cursor-pointer" @click="gotoDetail(item)">
        <div v-if="item.files.length > 0">
          <img :src="API_URL + item.files[0].path"
            class="m-auto max-h-[150px] rounded-lg hover:-translate-y-1 hover:scale-105 duration-300"
            v-if="item.files[0].path" />
        </div>
        <img :src="imageAvatar"
          class="m-auto max-h-[150px] rounded-lg hover:-translate-y-1 hover:scale-105 duration-300" v-else />
        <div class="text-center text-sm my-4 m-auto h-[48px] leading-5 text-blue-darken-4 font-bold">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="text-center font-bold text-2xl my-4 text-blue-darken-3">
      Sản phẩm lọc nước tinh khiết của OKYO
    </div>
    <div class="max-w-screen-xl m-auto my-4 grid grid-cols-2 md:grid-cols-4 gap-3 justify-center p-3">
      <div v-for="(item, index) in listItems1" :key="index"
        class="bg-white p-3 grid rounded-lg shadow-sm hover:shadow-xl cursor-pointer" @click="gotoDetail(item)">
        <div v-if="item.files.length > 0">
          <img :src="API_URL + item.files[0].path"
            class="m-auto max-h-[150px] rounded-lg hover:-translate-y-1 hover:scale-105 duration-300"
            v-if="item.files[0].path" />
        </div>
        <img :src="imageAvatar"
          class="m-auto max-h-[150px] rounded-lg hover:-translate-y-1 hover:scale-105 duration-300" v-else />
        <div class="text-center text-sm my-4 m-auto h-[48px] leading-5 text-blue-darken-4 font-bold">
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- <div class="flex justify-end gap-3 px-4 my-4">
      <span
        @click="tab = 1"
        class="font-bold cursor-pointer border border-blue p-3 rounded-lg hover:bg-gray-100"
        :class="tab === 1 ? 'text-blue-darken-4 hover:text-blue-darken-2' : ''"
        >Danh sách sản phẩm</span
      >
      <span
        @click="tab = 2"
        class="font-bold cursor-pointer border border-blue p-3 rounded-lg hover:bg-gray-100"
        :class="tab === 2 ? 'text-blue-darken-4 hover:text-blue-darken-2' : ''"
        >Thông tin bảo hành</span
      >
    </div> -->
    <!-- <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <CustomerProductVue />
      </v-tabs-window-item>
      <v-tabs-window-item :value="2">
        <CustomerGuaranteeVue />
      </v-tabs-window-item>
    </v-tabs-window> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import CustomerGuaranteeVue from "./sections/CustomerGuarantee.vue";
import CustomerHeaderVue from "./sections/CustomerHeader.vue";
import CustomerProductVue from "./sections/CustomerProduct.vue";
import CustomerSliderVue from "./sections/CustomerSlider.vue";
import { useBaseStore } from "../stores/baseStore";
import imageAvatar from "@/assets/images/productDF.jpg";
const API_URL = import.meta.env.VITE_API_URL;
export default {
  name: "CustomerPage",
  components: {
    CustomerProductVue,
    CustomerGuaranteeVue,
    CustomerSliderVue,
    CustomerHeaderVue,
  },
  data() {
    return {
      API_URL,
      imageAvatar,
      tab: 1,
      page: 1,
      pageCount: 0,
      itemsPerPage: 12,
      search: "",
      items: [],
      filterParams: {},
      listItems1: [],
    };
  },
  computed: {
    ...mapState(useBaseStore, ["getListTypeData"]),
  },
  methods: {
    ...mapActions(useBaseStore, ["getListProduct"]),
    getProducts(filters, itemsPerPage) {
      let paramsSearch = {
        page: this.page,
        size: itemsPerPage,
        filters: filters,
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
    gotoDetail(item) {
      this.$router.push({ path: `/chitiet/${item.id}` });
    },
  },
  created() {
    this.getProducts(
      [
        {
          fieldCode: "OUTSTANDING",
          operator: "EQUAL",
          value: "1",
        },
      ],
      3
    );

    let paramsSearch = {
      page: this.page,
      size: this.itemsPerPage,
      filters: [
        {
          fieldCode: "OUTSTANDING",
          operator: "EQUAL",
          value: "0",
        },
      ],
      sorts: [
        {
          fieldCode: "ID",
          typeSort: "DESC",
        },
      ],
    };
    this.getListProduct("public/product/search", paramsSearch).then((resp) => {
      if (resp) {
        this.listItems1 = resp.data.data;
        this.pageCount = resp.data.totalPage;
      }
    });
  },
};
</script>

<style></style>