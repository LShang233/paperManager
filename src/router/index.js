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
import LiteratureDetail from '@/views/LiteratureDetail/LiteratureDetail'
import NewLiterature from '@/views/LiteratureDetail/NewLiterature'
import Errors from '@/views/Error/Error'

// // 懒加载路由，实现页面渲染速度提高
// const Layout = ()=>('@/views/Layout/Layout')
// const Journal = ()=>('@/views/Journal/Journal')
// const Literature = ()=>('@/views/Literature/Literature')
// const ReviewLiterature = ()=>('@/views/ReviewLiterature/ReviewLiterature')
// const CustomerService = ()=>('@/views/CustomerService/CustomerService')
// const ServiceManager = ()=>('@/views/ServiceManager/ServiceManager')
// const JournalDetail = ()=>('@/views/JournalDetail/JournalDetail')
// const Login = ()=>("@/views/Login/Login")
// const LiteratureDetail = ()=>('@/views/LiteratureDetail/LiteratureDetail')
// const NewLiterature = ()=>('@/views/LiteratureDetail/NewLiterature')
// const Errors = ()=>('@/views/Error/Error')

Vue.use(Router)

export default new Router({
  mode: "history",
  base : "/paperhub/manager/",
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
        },
        {
          path: 'LiteratureDetail',
          name: 'LiteratureDetail',
          component: LiteratureDetail
        },
        {
          path: 'NewLiterature',
          name: "NewLiterature",
          component: NewLiterature
        }
      ]
    },
    {
      path: '*',
      name : 'Error',
      component : Errors
    }
  ]
})
