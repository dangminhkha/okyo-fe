<template>

  <div class="bg-gray-100 rounded-2xl mx-4">
    <v-carousel height="auto" :show-arrows="false" hide-delimiter-background>
      <v-carousel-item v-for="(slide, i) in sliders" :key="i">
        <!-- Item -->
        <img :src="slide" class="m-auto rounded-2xl" />
        <!-- End Item -->
      </v-carousel-item>
    </v-carousel>
  </div>
  <div class="rounded-lg max-w-screen-xl m-auto p-3">
    <div class="grid grid-cols-1 md:grid-cols-2 align-center gap-4 rounded-lg mb-4">
      <div class="font-bold text-blue-darken-3 text-xl">Danh sách sản phẩm</div>

      <v-text-field v-model="search" density="compact" label="Tìm kiếm" prepend-inner-icon="mdi:mdi-magnify"
        variant="outlined" flat hide-details single-line @click:prepend-inner="searchDara()"></v-text-field>
    </div>

    <v-divider></v-divider>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div v-for="(item, index) in items" :key="index">
        <div class="bg-white shadow-2xl rounded-lg p-3 hover:shadow-xl cursor-pointer">
          <div class="grid" @click="getProductDetails(item)">
            <div v-if="item.files.length > 0">
              <img :src="API_URL + item.files[0].path" class="m-auto max-h-[150px] rounded-lg"
                v-if="item.files[0].path" />
            </div>
            <img :src="imageAvatar" class="m-auto max-h-[150px] rounded-lg" v-else />
            <div class="text-center text-sm my-4 m-auto h-[48px] leading-5 text-blue-darken-4 font-bold">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-pagination class="mt-4" v-model="page" :length="pageCount" :total-visible="5" next-icon="mdi:mdi-menu-right"
      prev-icon="mdi:mdi-menu-left"></v-pagination>

    <v-dialog max-width="800" v-model="dialogDetail">
      <v-card>
        <v-card-text>
          <div class="bg-white rounded-lg">
            <div class="flex justify-between items-center mb-4">
              <div class="text-center text-xl font-bold text-blue-darken-4 uppercase">
                Chi tiết sản phẩm
              </div>
              <div class="text-right" @click="dialogDetail = false">
                <span class="mdi mdi-close cursor-pointer font-bold text-2xl"></span>
              </div>
            </div>
            <div class="border p-3 rounded-lg mt-4">
              <v-carousel v-if="dataSelected.files.length > 0" hide-delimiters hide-delimiter-background height="300"
                :cycle="true" :interval="5000">
                <template v-slot:prev="{ props }">
                  <div class="w-[50px] h-[50px] bg-gray-100 flex justify-center items-center shadow-2xl rounded-full"
                    @click="props.onClick">
                    <span class="mdi mdi-arrow-left"></span>
                  </div>
                </template>
                <template v-slot:next="{ props }">
                  <div class="w-[50px] h-[50px] bg-gray-100 flex justify-center items-center shadow-2xl rounded-full"
                    @click="props.onClick">
                    <span class="mdi mdi-arrow-right"></span>
                  </div>
                </template>
                <v-carousel-item cover v-for="(item, index) in dataSelected.files" :key="index">
                  <img :src="API_URL + item.path" class="m-auto max-h-[400px] h-[100%]" /></v-carousel-item>
              </v-carousel>
              <div class="grid grid-cols-1 md:grid-cols-2 justify-between gap-4 my-4">
                <div class="font-bold text-xl">
                  {{ dataSelected.name }}
                </div>
                <div class="font-bold text-xl md:text-right">
                  Thời hạn BH {{ dataSelected.monthGuarantee }} tháng
                </div>
              </div>
            </div>
            <div class="border p-3 rounded-lg mt-4">
              <div class="text-start mt-4 mb-2 text-blue-darken-4 text-2xl font-bold">
                Mô tả chi tiết
              </div>
              <div class="ql-editor" v-html="dataSelected.description"></div>
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
import imageAvatar from "@/assets/images/productDF.jpg";
const API_URL = import.meta.env.VITE_API_URL;
import img1 from "@/assets/images/Slider.jpg"
// import img2 from "@/assets/images/Slider2.jpg"
// import img3 from "@/assets/images/Slider3.jpg"
// import img4 from "@/assets/images/Slider4.png"
// import img5 from "@/assets/images/Slider5.jpg"
export default {
  name: "CustomerProductPage",
  components: {
  },
  data() {
    return {
      sliders: [
        img1
      ],
      imageAvatar,
      API_URL,
      page: 1,
      pageCount: 0,
      itemsPerPage: 12,
      search: "",
      headers: [
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
      dialogDetail: false,
      dataSelected: null,
    };
  },
  computed: {
    ...mapState(useBaseStore, ["windowReSize", "menuItemData"]),
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
          {
            fieldCode: "PRODUCT_TYPE",
            operator: "EQUAL",
            value: this.menuItemData,
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
      this.$router.push({ path: `/chitiet/${data.id}` });
      // this.getCusProductDetail(`public/product/${data.id}`).then((resp) => {
      //   if (resp) {
      //     this.dialogDetail = true;
      //     this.dataSelected = resp.data;
      //   }
      // });
    },
  },
  watch: {
    page(val) {
      this.getProducts();
    },
    menuItemData(val) {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style></style>