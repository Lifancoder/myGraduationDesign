import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Registered from '@/components/Registered'
import ChangePassword from '@/components/ChangePassword'
import HomeOverview from '@/components/HomeOverview'
import Overviewpreview from '@/components/Overviewpreview'
import RentManage from '@/components/RentManage'
import MeterReadingManage from '@/components/MeterReadingManage'
import ReportManage from '@/components/ReportManage'
import FinancialManage from '@/components/FinancialManage'
import RightsManage from '@/components/RightsManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/Registered',
      name: 'Registered',
      component: Registered
    },
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/HomeOverview',
      name: 'HomeOverview',
      component: HomeOverview,
      meta:{
        needLogin:true //需要加校验判断的路由
      },
      redirect: '/Overviewpreview',
      children: [
        {
          path: '/Overviewpreview',
          name: 'Overviewpreview',
          component: Overviewpreview,
          meta:{
            needLogin:true //需要加校验判断的路由
          }
        },
        {
          path: '/RentManage',
          name: 'RentManage',
          component: RentManage,
          meta:{
            needLogin:true //需要加校验判断的路由
          }
        },
        {
          path: '/MeterReadingManage',
          name: 'MeterReadingManage',
          component: MeterReadingManage,
          meta:{
            needLogin:true //需要加校验判断的路由
          }
        },
        {
          path: '/ReportManage',
          name: 'ReportManage',
          component: ReportManage,
          meta:{
            needLogin:true //需要加校验判断的路由
          }
        },
        {
          path: '/FinancialManage',
          name: 'FinancialManage',
          component: FinancialManage,
          meta:{
            needLogin:true //需要加校验判断的路由
          }
        },{
          path: '/RightsManage',
          name: 'RightsManage',
          component: RightsManage,
          meta:{
            needLogin:true //需要加校验判断的路由
          }
        }
      ]
    }
  ]
})
