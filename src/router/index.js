import Vue from 'vue'
import VueRouter from 'vue-router'
import Create from '../views/Create.vue'
import Detail from '../views/Detail.vue'
import Edit from '../views/Edit.vue'
import My from '../views/My.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/create',
    component: Create
  },
  {
    path: '/detail',
    component: Detail
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/edit',
    component: Edit
  }
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}//作用为屏蔽错误

export default router
