import { createRouter, createWebHistory } from "vue-router";
import { type IStaticMethods } from "preline/preline";
import { useBaseStore } from "../stores/baseStore";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin",
      name: "home",
      component: () => import("../views/MasterView.vue"),
      redirect: "/login",
      children: [
        {
          path: "/product",
          name: "DashboardPage",
          component: () => import("../views/DashboardView.vue"),
        },
        {
          path: "/sanpham/:id",
          name: "ProductDetail",
          component: () => import("../views/ProductDetail.vue"),
        },
        {
          path: "/baohanh",
          name: "BaoHanhPage",
          component: () => import("../views/BaohanhView.vue"),
        },
        {
          path: "/userinfo",
          name: "UserInfo",
          component: () => import("../views/UserInfo.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "Customer",
      component: () => import("../views/CusromerView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/changepass",
      name: "ChangePass",
      component: () => import("../views/ChangePassView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const baseStore = useBaseStore();
  const loginStatus = localStorage.getItem("isLogined") || "false";
  if (to.path === "/") {
    next();
  }
  if (to.path === "/login") {
    localStorage.setItem("isLogined", "false");
    baseStore.$state.loginData = null;
    next();
  } else if (loginStatus === "false") {
    next({ path: "/login" });
  } else next();
});
router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }
});
export default router;
