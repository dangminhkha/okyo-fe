<template>
  <div class="max-w-screen-lg m-auto bg-white rounded-lg p-4">
    <v-tabs v-model="tab" align-tabs="end" color="blue-darken-4" class="mb-8" :mobile="true">
      <v-tab :value="1"><span class="font-bold text-lg">Danh sách sản phẩm</span></v-tab>
      <v-tab :value="2"><span class="font-bold text-lg">Thông tin bảo hành</span></v-tab>
    </v-tabs>
    <CustomerSliderVue />
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
import CustomerGuaranteeVue from './sections/CustomerGuarantee.vue';
import CustomerHeaderVue from './sections/CustomerHeader.vue';
import CustomerProductVue from './sections/CustomerProduct.vue';
import CustomerSliderVue from './sections/CustomerSlider.vue';
export default {
  name: "CustomerPage",
  components: { CustomerProductVue ,CustomerGuaranteeVue, CustomerSliderVue, CustomerHeaderVue},
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style>
</style>