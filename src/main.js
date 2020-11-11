// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css' 
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.domain = "http://119.3.228.123:80/article/"
Vue.use(iView)

//  忽略警告
Vue.config.silent = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
