<template>
  <div class="max-w-screen-lg m-auto bg-white rounded-lg p-4">
    <v-tabs v-model="tab" align-tabs="center" color="primary">
      <v-tab :value="1">Danh sách bảo hành</v-tab>
      <v-tab :value="2">Thông tin sản phẩm</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <CustomerGuaranteeVue />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script>
import CustomerGuaranteeVue from "./sections/CustomerGuarantee.vue";
export default {
  name: "CustomerPage",
  components: { CustomerGuaranteeVue },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style>
</style>