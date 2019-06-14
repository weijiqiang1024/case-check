import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import Storage from 'vue-ls'
import store from '@/store/index'
import {Button,Form,Input,Icon,Layout,Menu} from 'ant-design-vue'
import { storageOptions } from '@/utils/default'

Vue.config.productionTip = false

Vue.use(Storage,storageOptions) //基础数据缓存
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
