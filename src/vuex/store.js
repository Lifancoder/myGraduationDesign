import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store =new Vuex.Store({
  //定义状态
  state:{
    isLogin:{},
  },
  mutations:{
    isLogin(state,info){
      localStorage.setItem('isLogin',info)
      state.isLogin=info
    },
  },

})
const getters={
  getinfo:(state) =>{
    state.isLogin=localStorage.getItem('isLogin')
    return state.isLogin
  }
}
export default store
