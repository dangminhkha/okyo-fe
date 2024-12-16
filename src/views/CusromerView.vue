<template>
  <div class="max-w-screen-lg m-auto bg-white rounded-lg p-4">
    <v-tabs v-model="tab" align-tabs="center" color="primary">
      <v-tab :value="1">Danh sách sản phẩm</v-tab>
      <v-tab :value="2">Thông tin bảo hành</v-tab>
    </v-tabs>
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
import CustomerProductVue from './sections/CustomerProduct.vue';
export default {
  name: "CustomerPage",
  components: { CustomerProductVue ,CustomerGuaranteeVue},
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style>
</style>