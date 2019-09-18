// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

// 引入mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor);

//全局引入iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.config.productionTip = false

 //  拦截器
router.beforeEach( (to,from,next)=> {
  if(to.meta.requireAuth){
  //  需要登录
    if(store.state.userinfo.token){
      next()
    }else {
      next({name:'Login',query:{backurl:to.fullPath}})
    }
  }else {
    next()
  };
  if(to.meta.title) {
      document.title = to.meta.title
    }

});


/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});



export default vue

