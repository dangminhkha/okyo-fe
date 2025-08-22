<template>
  <!-- ========== MAIN CONTENT ========== -->
  <div class="-mt-px">
    <!-- Breadcrumb -->
    <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
      <div class="flex items-center py-2 justify-between">
        <!-- Navigation Toggle -->
        <button type="button"
          class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none    "
          aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar"
          aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar" ref="triggerMenuCustomer">
          <span class="sr-only">Toggle Navigation</span>
          <span class="mdi mdi-menu"></span>
        </button>
        <a class="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
          @click="bhClickLogo('/')">
          <img src="@/assets/images/logo.jpg" class="w-[100px] m-auto" />
        </a>
        <!-- End Navigation Toggle -->
      </div>
    </div>
    <!-- End Breadcrumb -->
  </div>

  <!-- Sidebar -->
  <div id="hs-application-sidebar"
    class="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-[260px] h-full fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 block lg:hidden lg:translate-x-0 lg:end-auto lg:bottom-0  "
    role="dialog" tabindex="-1" aria-label="Sidebar">
    <div class="relative flex flex-col h-full max-h-full">
      <div class="px-6 pt-4 m-auto">
        <!-- Logo -->
        <a class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
          @click="bhClick('/')">
          <img src="@/assets/images/logo.jpg" class="w-[150px] m-auto" />
        </a>
        <!-- End Logo -->
      </div>

      <!-- Content -->
      <div
        class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300  ">
        <nav class="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
          <ul class="flex flex-col space-y-1">
            <li>
              <a class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100   "
                @click="bhClick('/')">
                <span class="mdi mdi-home-outline text-lg"></span>
                Trang chủ
              </a>
            </li>
            <li class="hs-accordion" id="account-accordion">
              <button type="button"
                class="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100   "
                aria-expanded="true" aria-controls="account-accordion-child">
                <span class="mdi mdi-list-box-outline text-lg"></span>
                Danh mục sản phẩm

                <svg class="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="m18 15-6-6-6 6" />
                </svg>

                <svg class="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              <div id="account-accordion-child"
                class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
                role="region" aria-labelledby="account-accordion">
                <ul class="ps-8 pt-1 space-y-1">
                  <li v-for="(item, index) in getListTypeData.data" :key="index">
                    <a class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100  "
                      @click="menuSelect(item.id)">
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <a class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100   "
                @click="bhClick('/thongtinbaohanh')">
                <span class="mdi mdi-information-box-outline text-lg"></span>
                Thông tin bảo hành
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- End Content -->
    </div>
  </div>
  <!-- End Sidebar -->

  <!-- ========== END MAIN CONTENT ========== -->
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
      if (window.innerWidth < 1024) {
        this.$refs.triggerMenuCustomer.click();
      }
      this.changeMenu(val);
    },
    bhClick(val) {
      if (window.innerWidth < 1024) {
        this.$refs.triggerMenuCustomer.click();
      }
      this.$router.push({ path: val });
    },
    bhClickLogo(val) {
      this.$router.push({ path: val });
    },
  },
};
</script>

<style></style>