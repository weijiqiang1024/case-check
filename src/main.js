import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/index'
import '@/utils/default'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
