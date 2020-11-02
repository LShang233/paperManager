import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/Layout'
import Journal from '@/views/Journal/Journal'
import Literature from '@/views/Literature/Literature'
import ReviewLiterature from '@/views/ReviewLiterature/ReviewLiterature'
import CustomerService from '@/views/CustomerService/CustomerService'
import ServiceManager from '@/views/ServiceManager/ServiceManager'
import JournalDetail from '@/views/JournalDetail/JournalDetail'
import Login from "@/views/Login/Login"
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path : "/",
      name : "Login",
      component : Login
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: "Journal",
      children: [
        {
          path: 'Journal',
          name: 'Journal',
          component: Journal
        },
        {
          path: 'Literature',
          name: 'Literature',
          component: Literature
        },
        {
          path: 'ReviewLiterature',
          name: 'ReviewLiterature',
          component: ReviewLiterature
        },
        {
          path: 'CustomerService',
          name: 'CustomerService',
          component: CustomerService
        },
        {
          path: 'ServiceManager',
          name: 'ServiceManager',
          component: ServiceManager
        },
        {
          path: 'JournalDetail/:jid',
          name: 'JournalDetail',
          component: JournalDetail
        }
      ]
    }
  ]
})
