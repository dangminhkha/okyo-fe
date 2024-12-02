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
          <button
            type="button"
            class="md:hidden size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            <svg
              class="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span class="sr-only">Search</span>
          </button>

          <button
            type="button"
            class="size-[38px] relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
          >
            <svg
              class="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span class="sr-only">Notifications</span>
          </button>

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
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Thông tin", path: "/userinfo" },
        { title: "Đổi mật khẩu", path: "/changepass" },
      ],
    };
  },
};
</script>

<style>
</style>