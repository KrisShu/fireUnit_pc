// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import'../static/Ueditor/ueditor.config.js'
import'../static/Ueditor/ueditor.all.js'
import'../static/Ueditor/lang/zh-cn/zh-cn.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './httpConfig/axios'
import api from "./httpConfig/api";
import './assets/css/reset.css';/* 引入初始化样式 */
import echarts from 'echarts'
import scroll from 'vue-seamless-scroll'//跑马滑动
import Viewer from 'v-viewer'//图片查看器
import 'viewerjs/dist/viewer.css'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import AMap from  'vue-amap'
import $ from 'jquery'


// import dealTime from '../src/httpConfig/dealTime'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);//引入整个ElementUI，全局使用
Vue.use(scroll);
Vue.use(AMap)
AMap.initAMapApiLoader({
  // key: 'f6f5b9d751670047388b9e3e517b97f6', //web服务key
  key: '12bcf15b0bfaecec37c995a8f4fd1d11', //web端
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],//依赖配置，根据自己的需求引入
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});


Vue.use(Viewer, {
  defaultOptions: {
      zIndex: 9999
  }
})
// Vue.prototype.dealTime = dealTime;//处理时间函数
Vue.prototype.$URL = 'http://fd.sctsjkj.com:5081';
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
// axios.defaults.baseURL = '/api' /* 线上接口ip地址 */
/* axios.defaults.baseURL = 'http://fd.sctsjkj.com:5081' */

Vue.config.productionTip = false;
router.beforeEach((to,from,next) => {
  NProgress.start() 
  next()
})

router.afterEach(() => {
  NProgress.done()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
