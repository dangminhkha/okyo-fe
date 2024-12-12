<template>
  <header
    class="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px]"
  >
    <nav class="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
      <div
        class="sticky top-0 inset-x-0 z-20 bg-white px-4 sm:px-6 lg:px-8 lg:hidden"
      >
        <div class="flex items-center py-2">
          <!-- Navigation Toggle -->
          <button
            type="button"
            class="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="hs-application-sidebar"
            aria-label="Toggle navigation"
            data-hs-overlay="#hs-application-sidebar"
            ref="triggerMenu"
          >
            <span class="sr-only">Toggle Navigation</span>
            <svg
              class="block size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <!-- End Navigation Toggle -->

          <!-- Breadcrumb -->
          <!-- End Breadcrumb -->
        </div>
      </div>

      <div
        class="w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3"
      >
        <div class="flex flex-row items-center justify-end gap-1">
          <span class="mr-2">{{loginData?.data?.user?.name || ''}}</span>

          <!-- Dropdown -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <img
                v-bind="props"
                class="shrink-0 size-[38px] rounded-full"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                alt="Avatar"
              />
            </template>

            <v-list>
              <v-list-item @click="changePass">
                <v-list-item-title> Đổi mật khẩu</v-list-item-title>
              </v-list-item>
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-title>
                  <router-link :to="item.path">{{
                    item.title
                  }}</router-link></v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>

          <!-- End Dropdown -->
        </div>
      </div>
    </nav>
  </header>
  <!-- ========== END HEADER ========== -->
  <!-- ========== MAIN CONTENT ========== -->
  <div class="-mt-px">
    <!-- Breadcrumb -->

    <!-- End Breadcrumb -->
  </div>
  <v-dialog v-model="dialogChane" max-width="500" persistent>
    <div class="bg-white p-3">
      <div class="flex justify-between my-3">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800">Đổi mật khẩu</h1>
        </div>
        <span class="mdi mdi-close" @click="dialogChane = false"></span>
      </div>

      <div class="mt-5">
        <!-- Form -->
        <v-form
          ref="form"
          v-model="valid"
          class="mx-auto max-w-xl"
          @submit.prevent="accepChange"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Mật khẩu cũ"
                variant="outlined"
                density="comfortable"
                v-model="oldPassWord"
                :rules="rulesOldPassWord"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-text-field
                label="Mật khẩu mới"
                variant="outlined"
                density="comfortable"
                v-model="passWord"
                :rules="rulesPassWord"
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <v-text-field
                label="Nhập lại mật khẩu mới"
                variant="outlined"
                density="comfortable"
                v-model="repassWord"
                :rules="rulesRePassWord"
              ></v-text-field
            ></v-col>
          </v-row>
        </v-form>
        <div class="text-center normal-case">
          <v-btn
            variant="flat"
            color="blue-darken-4"
            class="mt-3"
            @click="accepChange"
            ><span class="text-md normal-case">Xác nhận</span></v-btn
          >
        </div>
        <!-- End Form -->
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useBaseStore } from "../stores/baseStore";
export default {
  data() {
    return {
      items: [
        { title: "Thông tin", path: "/userinfo" },
        { title: "Đăng xuất", path: "/login" },
      ],
      dialogChane: false,
      valid: false,
      oldPassWord: null,
      rulesOldPassWord: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập mật khẩu cũ";
        },
      ],
      passWord: null,
      rulesPassWord: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập mật khẩu";
        },
      ],
      repassWord: null,
      rulesRePassWord: [
        (value) => {
          if (value) return true;
          return "Vui lòng nhập lại mật khẩu";
        },
      ],
    };
  },
  computed:{
    ...mapState(useBaseStore, ["loginData"])
  },
  methods: {
    ...mapActions(useBaseStore, ["snackChange"]),
    changePass() {
      this.dialogChane = true;
    },
    async accepChange() {
      let params = {
        passWord: this.passWord,
        repassWord: this.repassWord,
      };
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.snackChange({
          status: true,
          message: "Đổi mật khẩu thành công",
          color: "blue-darken-4",
        });
      }
    },
  },
  watch: {
    $route(val) {
      if (val.fullPath === "/product" || val.fullPath === "/baohanh") {
        if (window.innerWidth < 1024) {
          this.$refs.triggerMenu.click();
        }
      }
    },
  },
};
</script>

<style>
</style>