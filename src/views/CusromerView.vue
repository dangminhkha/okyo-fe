<template>
  <div class="max-w-screen-xl m-auto bg-white rounded-lg p-4">
    <CustomerSliderVue />
    <div class="flex justify-end gap-3 px-4 my-4">
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
    </div>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <CustomerProductVue />
      </v-tabs-window-item>
      <v-tabs-window-item :value="2">
        <CustomerGuaranteeVue />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script>
import CustomerGuaranteeVue from "./sections/CustomerGuarantee.vue";
import CustomerHeaderVue from "./sections/CustomerHeader.vue";
import CustomerProductVue from "./sections/CustomerProduct.vue";
import CustomerSliderVue from "./sections/CustomerSlider.vue";
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
      tab: 1,
    };
  },
};
</script>

<style>
</style>