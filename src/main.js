// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/icon/iconfont.css'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import VueParticles from 'vue-particles'
import Vuex from 'vuex'
import store from './vuex/store'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueParticles)
/* eslint-disable no-new */
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01'
axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.timeout=
/*axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    let data = {data: ''}
    data.data = config.data
    config.data = JSON.stringify(data)
  }
  return config;
}, (error) => {
  Message.error({message: '请求超时!'})
  return Promise.reject(error);

});*/

axios.interceptors.response.use(data => {
  if (data.status == 200) {
    return data
  } else {
    Message.error({message: data.data.err_msg || data.data.err_msg})
    return Promise.reject(data)
  }

}, err => {
  return Promise.reject(err);
})

Vue.prototype.$axios = axios;

Vue.use(router)
router.beforeEach(function (to,from,next) {
  if (to.meta.needLogin){
    //页面是否登录
    if (localStorage.getItem("token")=== null){
      //判断本地存储是否有token（这里是用的登陆账号）数据
      next({ path:'/'});
    } else {
      next({});
    }
  } else {
    //不需要登录才能进入
    next();//继续执行
  }
});
// 全局路由守卫


new Vue({
  el: '#app',
  router,
  store:store,
  components: { App },
  create(){
    if (localStorage.getItem("isLogin")===null){
      localStorage.setItem("isLogin",{});
    }
    this.$store.state.isLogin=localStorage.getItem('isLogin');
  },
  template: '<App/>'
})
