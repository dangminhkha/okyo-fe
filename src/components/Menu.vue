<template>
  <!-- Sidebar -->
  <div id="hs-application-sidebar"
    class="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-[260px] h-full hidden fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0"
    role="dialog" tabindex="-1" aria-label="Sidebar">
    <div class="relative flex flex-col h-full max-h-full">
      <div class="px-6 pt-4">
        <!-- Logo -->
        <a class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="/"
          aria-label="Home page">
          <img :src="imageAvatar" class="m-auto" />
        </a>
        <!-- End Logo -->
      </div>

      <!-- Content -->
      <div
        class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <nav class="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
          <ul class="flex flex-col space-y-1">
            <li>
              <router-link :to="'/thongke'"
                class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                :class="$route.fullPath === '/thongke' ? 'bg-gray-100' : ''">
                
                <i class="fa-solid fa-chart-simple"></i>
                Thống kê
              </router-link>
            </li>
            <li v-if="loginData?.data.user.role === 'ADMIN'">
              <router-link :to="'/product'"
                class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                :class="$route.fullPath === '/product' ? 'bg-gray-100' : ''">
                <span class="fa-solid fa-house"></span>
                Quản lý sản phẩm
              </router-link>
            </li>

            <li>
              <router-link :to="'/baohanh'"
                class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                :class="$route.fullPath === '/baohanh' ? 'bg-gray-100' : ''">
                <span class="fa-regular fa-calendar-days"></span>
                Thông tin bảo hành
              </router-link>
            </li>
            <li v-if="loginData?.data.user.role === 'ADMIN'">
              <router-link :to="'/agent'"
                class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                :class="$route.fullPath === '/agent' ? 'bg-gray-100' : ''">
                <span class="fa-solid fa-briefcase"></span>
                Quản lý đại lý
              </router-link>
            </li>
            <li v-if="loginData?.data.user.role === 'ADMIN'">
              <router-link :to="'/user'"
                class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                :class="$route.fullPath === '/user' ? 'bg-gray-100' : ''">
                <span class="fa-solid fa-user"></span>
                Quản lý User
              </router-link>
            </li>
            <!-- <li v-if="loginData?.data.user.role === 'ADMIN'">
              <router-link :to="'/pushNoti'"
                class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                :class="$route.fullPath === '/pushNoti' ? 'bg-gray-100' : ''">
                <span class="fa-solid fa-comment-sms"></span>
                Gửi thông báo
              </router-link>
            </li> -->
            
            <!-- <li>
              <router-link
                :to="'/login'"
                class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"
                href="#"
              >
                <span class="mdi mdi-logout"></span>
                Đăng xuất
              </router-link>
            </li> -->
          </ul>
        </nav>
      </div>
      <!-- End Content -->
    </div>
  </div>
  <!-- End Sidebar -->
</template>

<script>
import imageAvatar from "@/assets/images/logo_no_bg.png";
import { mapState } from 'pinia';
import { useBaseStore } from '../stores/baseStore';
export default {
  name: "MenuPage",
  data() {
    return {
      imageAvatar,
    };
  },
  computed: {
    ...mapState(useBaseStore, ['loginData'])
  }
};
</script>

<style></style>