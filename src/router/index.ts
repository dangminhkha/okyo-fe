import { createRouter, createWebHistory } from "vue-router";
import { type IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/MasterView.vue"),
      redirect:'/dashboard',
      children:[
        {
          path: "/dashboard",
          name: "DashboardPage",
          component: () => import("../views/DashboardView.vue"),
        },
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
});
router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100)
  }
});
export default router;
