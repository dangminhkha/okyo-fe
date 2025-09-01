import { createRouter, createWebHistory } from 'vue-router'
import { type IStaticMethods } from 'preline/preline'
import { useBaseStore } from '../stores/baseStore'
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: () => import('../views/MasterView.vue'),
      redirect: '/login',
      meta: {
        rule: 'admin',
      },
      children: [
        {
          path: '/product',
          name: 'DashboardPage',
          component: () => import('../views/DashboardView.vue'),
          meta: {
            rule: 'admin',
          },
        },
        {
          path: '/sanpham/detail/:id',
          name: 'ProductDetail',
          component: () => import('../views/ProductDetail.vue'),
          meta: {
            rule: 'admin',
          },
        },
        {
          path: '/baohanh',
          name: 'BaoHanhPage',
          component: () => import('../views/BaohanhView.vue'),
          meta: {
            rule: 'admin',
          },
        },
        {
          path: '/userinfo',
          name: 'UserInfo',
          component: () => import('../views/UserInfo.vue'),
          meta: {
            rule: 'admin',
          },
        },
      ],
    },
    {
      path: '/',
      name: 'CustomerMaster',
      component: () => import('../views/CustomerMaster.vue'),
      meta: {
        rule: 'customer',
      },
      children: [
        {
          path: '/',
          name: 'Customer',
          component: () => import('../views/CusromerView.vue'),
          meta: {
            rule: 'customer',
          },
        },
        {
          path: '/danh-muc/:id',
          name: 'CustomerList',
          component: () => import('../views/sections/CustomerProduct.vue'),
          meta: {
            rule: 'customer',
          },
        },
        {
          path: '/chitiet/:id',
          name: 'CustomerProductDetail',
          component: () =>
            import('../views/sections/CustomerProductDetail.vue'),
          meta: {
            rule: 'customer',
          },
        },
        {
          path: '/thongtinbaohanh',
          name: 'CustomerGuarantee',
          component: () => import('../views/sections/CustomerGuarantee.vue'),
          meta: {
            rule: 'customer',
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        rule: 'admin',
      },
    },
    {
      path: '/changepass',
      name: 'ChangePass',
      component: () => import('../views/ChangePassView.vue'),
      meta: {
        rule: 'admin',
      },
    },
  ],
})
router.beforeEach((to, from, next) => {
  const baseStore = useBaseStore()
  const loginStatus = localStorage.getItem('isLogined') || 'false'

  if (to.path === '/login') {
    localStorage.setItem('isLogined', 'false')
    baseStore.$state.loginData = null
    next()
  } else if (loginStatus === 'false' && to.meta.rule !== 'customer') {
    next({ path: '/login' })
  } else next()
})
router.afterEach((to, from, failure) => {
  document.body.scrollTop = 0 // For Safari
  document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit()
    }, 100)
  }
})
export default router
