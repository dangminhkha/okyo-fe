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
      <div class="flex text-center justify-between px-2">
        <div>{{ dataDetail.name }}</div>
        <div>Thời hạn BH {{ dataDetail.monthGuarantee }} tháng</div>
      </div>
      <div>
        <div class=""></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useBaseStore } from "../stores/baseStore";
export default {
  name: "ProductDetailPage",
  components: {},
  data() {
    return {
      dataDetail: null,
      guaranteeData: null,
      imageList: [],
      items: [],
      header: [],
    };
  },
  methods: {
    ...mapActions(useBaseStore, [
      "detailsProduct",
      "getListGuarantee",
      "getImageFromId",
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
        }
      });
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