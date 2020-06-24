import Vue from 'vue'
import Router from 'vue-router'
/* 在此引入页面路径 */


const login = ()=> import ('../pages/login/index.vue')
const home = ()=> import ('../pages/home/index.vue')
const dataPage = ()=> import ('../pages/dataPages/index.vue')
const dutyRecord = ()=> import ('../pages/dataPages/dutyRecord/index.vue')
const facilityFailure = ()=> import ('../pages/dataPages/facilityFailure/index.vue')
const fireWarning = ()=> import ('../pages/dataPages/hiddendanger/firewaring.vue')
const AIAnalysis = ()=> import ('../pages/dataPages/hiddendanger/AIAnalysis.vue')
const hiddeElectric = ()=> import ('../pages/dataPages/hiddendanger/hiddeElectric.vue')
const hiddenPipe = ()=> import ('../pages/dataPages/hiddendanger/hiddenPipe.vue')
const inspectionRecords = ()=> import ('../pages/dataPages/inspectionRecords/index.vue')
const materialLinkTerminal = ()=> import  ('../pages/dataPages/materialLinkTerminal/index.vue')
const electricalFire = () => import ('../pages/dataPages/materialLinkTerminal/electricalFire.vue')
const firenetworking = () => import ('../pages/dataPages/materialLinkTerminal/firenetworking.vue')
const IndependentSmokesense =()=> import ('../pages/dataPages/materialLinkTerminal/IndependentSmokesense.vue')
const AIfacilities = () => import ('../pages/dataPages/materialLinkTerminal/AIfacilities.vue')
const pipeNetwork = () => import ('../pages/dataPages/materialLinkTerminal/pipeNetwork.vue')
const otherFacilities = () => import ('../pages/dataPages/materialLinkTerminal/otherFacilities.vue')
const iframe = () =>import ('../../src/pages/iframe/iframe.vue')
const baseInformation = () => import ("../../src/pages/dataPages/unitInformation/baseInformation.vue")
const ArchitectureInformation = () => import ("../../src/pages/dataPages/unitInformation/ArchitectureInformation.vue")
const firePractitioners = () => import ("../../src/pages/dataPages/unitInformation/firePractitioners.vue")
const firePreventionPlan = () => import ("../../src/pages/dataPages/unitInformation/firePreventionPlan.vue")
const minFirestation = () => import ("../../src/pages/dataPages/unitInformation/minFirestation.vue")
const fireAlarmLocation = () =>import("../../src/pages/dataPages/unitInformation/fireAlarmLocation.vue")
const datareport = () =>import("../../src/pages/dataPages/datareport/index.vue")


Vue.use(Router);
const router =new Router( {
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{
        auth:true //设置当前路由需要校验
      }
    },
    {
      path: '/fireAlarmLocation',
      name: 'fireAlarmLocation',
      component: fireAlarmLocation,
    },
    {
      path: '/dataPage',
      name: 'dataPage',
      component: dataPage,
      redirect:'/dataPage/fireWarning',
      children: [
        {
          path: 'facilityFailure',
          name: 'facilityFailure',
          component: facilityFailure
        },
        {
          path: 'fireWarning',
          name: 'fireWarning',
          component: fireWarning
        },
        {
          path: 'hiddeElectric',
          name: 'hiddeElectric',
          component: hiddeElectric
        },
        {
          path: 'hiddenPipe',
          name: 'hiddenPipe',
          component: hiddenPipe
        },
        {
          path: 'IndependentSmokesense',
          name: 'IndependentSmokesense',
          component: IndependentSmokesense
        },
        {
          path: 'AIAnalysis',
          name: 'AIAnalysis',
          component: AIAnalysis
        },
        {
          path: 'inspectionRecords',
          name: 'inspectionRecords',
          component: inspectionRecords
        },
        {
          path: 'materialLinkTerminal',
          name: 'materialLinkTerminal',
          component: materialLinkTerminal
        },
        {
          path: 'electricalFire',
          name: 'electricalFire',
          component: electricalFire
        },
        {
          path: 'firenetworking',
          name: 'firenetworking',
          component: firenetworking
        },
        {
          path: 'AIfacilities',
          name: 'AIfacilities',
          component: AIfacilities
        },
        {
          path: 'pipeNetwork',
          name: 'pipeNetwork',
          component: pipeNetwork
        },
        {
          path: 'otherFacilities',
          name: 'otherFacilities',
          component: otherFacilities
        },
        {
          path: 'dutyRecord',
          name: 'dutyRecord',
          component: dutyRecord
        },
        {
          path: 'iframe',
          name: 'iframe',
          component: iframe
        },
        {
          path: 'datareport',
          name: 'datareport',
          component: datareport
        },
        {
          path: 'baseInformation',
          name: 'baseInformation',
          component: baseInformation
        },
        {
          path: 'ArchitectureInformation',
          name: 'ArchitectureInformation',
          component: ArchitectureInformation
        },
        {
          path: 'firePractitioners',
          name: 'firePractitioners',
          component: firePractitioners
        },
        {
          path: 'firePreventionPlan',
          name: 'firePreventionPlan',
          component: firePreventionPlan
        },
        {
          path: 'minFirestation',
          name: 'minFirestation',
          component: minFirestation
        },
      ]
    }]
})
router.beforeEach(function(to,from,next){
  if(to.matched.some( m => m.meta.auth)){  // 对路由进行验证       
    if(localStorage.getItem('islogin')) { // 已经登陆      
      next()   // 正常跳转到你设置好的页面     
    }
    else{       
      // 未登录则跳转到登陆界面
      next({path:'/login'})
    } 
  }else{ 
    next() 
  } 
})
export default router;

