<template>
  <HeaderVue />
  <MenuVue />

  <!-- Content -->
  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <router-view></router-view>
    </div>
  </div>
  <!-- End Content -->
  <!-- ========== END MAIN CONTENT ========== -->
</template>

<script>
import HeaderVue from "../components/Header.vue";
import MenuVue from "../components/Menu.vue";
export default {
  components: {
    HeaderVue,
    MenuVue,
  },
};
</script>

<style>
</style>