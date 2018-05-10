// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import VueResource from 'vue-resource'
import 'iview/dist/styles/iview.css'
import global_ from './components/Global'
import md5 from '../static/md5.js'
Vue.prototype.GLOBAL = global_
Vue.prototype.MD5 = md5
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.use(iView)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
