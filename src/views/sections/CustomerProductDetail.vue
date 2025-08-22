<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-screen-xl m-auto my-4 p-3" v-if="dataSelected">
    <div>
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
      <div v-else>
        <img :src="imageAvatar" class="m-auto max-h-[360px] rounded-lg" />
      </div>
    </div>
    <div class="">
      <div class="text-lg md:text-2xl font-bold text-gray-600">
        {{ dataSelected.name }}
      </div>
      <div class="customer-divide"></div>
      <div class="font-bold">
        Thời gian bảo hành: {{ dataSelected.monthGuarantee }} tháng
      </div>
      <div class="border-y my-3 text-sm py-2 text-gray-500">
        {{ dataSelected.productTypeName }}
      </div>
      <div v-if="dataSelected.details">
        <div class="font-bold text-xl my-3">Đặc điểm nổi bật</div>
        <ul class="list-disc list-inside">
          <li v-for="(item, index) in dataSelected.details" :key="index" class="text-gray-500">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>

    <div>
      <v-list lines="two" class="bg-transparent">
        <v-list-item title="GIÁ TỐT NHẤT" subtitle="Cam kết giá tốt nhất cho khách hàng"
          :prepend-avatar="icon1"></v-list-item>
        <v-list-item title="CHÍNH HÃNG" subtitle="Cam kết sản phẩm chính hãng"
          :prepend-avatar="icon2"></v-list-item>
        <v-list-item title="CHÍNH SÁCH ĐỔI TRẢ" subtitle="Đổi trả dễ dàng sản phẩm lỗi, không đúng"
          :prepend-avatar="icon3"></v-list-item>
        <v-list-item title="GIAO HÀNG SIÊU TỐC" subtitle="Giao hàng nhanh khu vực TP.HCM"
          :prepend-avatar="icon4"></v-list-item>
      </v-list>
      <div class="border-2 border-black p-3 rounded-lg">
        <div class="text-xl font-bold">Thông tin liên hệ</div>
        <div>
          <span class="font-bold">Địa chỉ:</span> 40 Đường D16, Phường Tây Thạnh, Quận Tân Phú , TP HCM
        </div>
        <div>
          <span class="font-bold">Hotline:</span>
          <a href="tel:028 22436633">028 22436633</a>
        </div>
        <div>
          <span class="font-bold">Email:</span>
          <a href="info@osgvietnam.com">info@osgvietnam.com </a>
        </div>
        <div>
          <span class="font-bold">Website:</span>
          <a href="https://osg-humanwater.com" target="_blank">https://osg-humanwater.com</a>
        </div>
      </div>
    </div>
  </div>
  <div class="max-w-screen-xl m-auto my-4 p-3" v-if="dataSelected?.description">
    <div class="text-start mt-4 mb-2 text-blue-darken-4 text-2xl font-bold">
      Mô tả chi tiết
    </div>
    <div class="ql-editor" v-html="dataSelected?.description"></div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
import imageAvatar from "@/assets/images/productDF.jpg";
import icon1 from "@/assets/images/icon-1-1.png";
import icon2 from "@/assets/images/icon-1-2.png";
import icon3 from "@/assets/images/icon-1-3.png";
import icon4 from "@/assets/images/icon-1-4.png";
const API_URL = import.meta.env.VITE_API_URL;
export default {
  name: "ProductDetailPage",
  props: {},
  data() {
    return {
      API_URL,
      imageAvatar,
      icon1,
      icon2,
      icon3,
      icon4,
      dataSelected: null,
    };
  },
  methods: {
    ...mapActions(useBaseStore, ["getCusProductDetail"]),
    fetchDataDetail(data) {
      this.getCusProductDetail(`public/product/${data}`).then((resp) => {
        if (resp) {
          this.dialogDetail = true;
          this.dataSelected = resp.data;
        }
      });
    },
  },
  created() {
    this.fetchDataDetail(this.$route.params.id);
  },
};
</script>

<style></style>