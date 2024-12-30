<template>
  <!-- ========== HEADER ========== -->
  <header
    class="hidden md:block sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5"
  >
    <nav
      class="px-4 sm:px-6 flex justify-between basis-full items-center w-full mx-auto"
    >
      <div>
        <!-- Logo -->
        <router-link
          class="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
          :to="'/'"
        >
          <img src="@/assets/images/logo.png" class="w-[150px]" />
        </router-link>
        <!-- End Logo -->
      </div>

      <div
        class="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3"
      >
        <v-menu>
          <template v-slot:activator="{ props }">
            <span
              v-bind="props"
              class="text-lg text-blue-darken-2 font-bold cursor-pointer border p-3 rounded-xl hover:-translate-y-1 hover:scale-105 duration-300"
            >
              Danh mục sản phẩm
              <span class="mdi mdi-arrow-down text-2xl"></span>
            </span>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in getListTypeData.data" :key="i">
              <v-list-item-title
                class="text-blue-darken-3 font-bold cursor-pointer"
                @click="menuSelect(item.id)"
                >{{ item.name }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>

        <div
          class="text-lg text-blue-darken-2 font-bold cursor-pointer border p-3 rounded-xl hover:-translate-y-1 hover:scale-105 duration-300"
        >
          <router-link :to="'/thongtinbaohanh'">Thông tin bảo hành</router-link>
        </div>
      </div>
    </nav>
  </header>
  <!-- ========== END HEADER ========== -->
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../../stores/baseStore";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useBaseStore, ["getListTypeData"]),
  },
  methods: {
    ...mapActions(useBaseStore, ["changeMenu"]),
    menuSelect(val) {
      
      this.changeMenu(val);
    },
  },
};
</script>

<style>
</style>