<template>
  <CustomerHeaderVue />
  <!-- <CustomerMenuVue /> -->
  <!-- Content -->
  <div class="w-full">
    <div class="space-y-4 sm:space-y-6">
      <router-view> </router-view>
    </div>
  </div>
  <!-- End Content -->
</template>

<script>
import { mapActions } from "pinia";
import CustomerHeaderVue from "./component/CustomerHeader.vue";
import CustomerMenuVue from "./component/CustomerMenu.vue";
import { useBaseStore } from "../stores/baseStore";
export default {
  components: {
    CustomerHeaderVue,
    CustomerMenuVue,
  },
  data() {
    return {
      typeList: null,
    };
  },
  methods: {
    ...mapActions(useBaseStore, ["getListProductType"]),
  },
  created() {
    this.getListProductType("public/product-type").then((resp) => {
      if (resp) {
        this.typeList = resp.data;
      }
    });
  },
};
</script>

<style></style>