import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')
const Error = () => import('views/error/Error')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter(to, from, next) {
      document.title = "主页"
      next()
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    beforeEnter(to, from, next) {
      document.title = "分类"
      next()
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    beforeEnter(to, from, next) {
      document.title = "购物车"
      next()
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter(to, from, next) {
      document.title = "我的"
      next()
    }
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '*',
    component: Error,
    beforeEnter(to, from, next) {
      document.title = "出错啦"
      next()
    }
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})


export default router
