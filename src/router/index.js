import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/Layout'
import Journal from '@/views/Journal/Journal'
import Literature from '@/views/Literature/Literature'
import ReviewLiterature from '@/views/ReviewLiterature/ReviewLiterature'
import CustomerServiceChat from '@/views/CustomerServiceChat/CustomerServiceChat'
import ServiceManager from '@/views/ServiceManager/ServiceManager'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
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
          path: 'CustomerServiceChat',
          name: 'CustomerServiceChat',
          component: CustomerServiceChat
        },
        {
          path: 'ServiceManager',
          name: 'ServiceManager',
          component: ServiceManager
        },
      ]
    }
  ]
})
