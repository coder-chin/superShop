import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Toast from './components/common/toast'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(Toast)
//解决移动端300毫秒延迟
FastClick.attach(document.body)

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/myplaceholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')