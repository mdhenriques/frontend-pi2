import { createRouter, createWebHistory } from 'vue-router'
import type {  RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainScreenView from '@/views/MainScreenView.vue'
import SignUpView from '@/views/SignUpView.vue'

const routes: RouteRecordRaw[] = [
  { 
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/main',
    name: 'main',
    component: MainScreenView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
