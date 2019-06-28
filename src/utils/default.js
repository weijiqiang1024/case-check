/* 
 * @Title: $一些默认配置
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-13 16:13:33 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-28 08:44:20
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */
import Vue from 'vue'
import { notification, message, Button, Form, Input, Icon, Layout, Menu, Table, Col, Row, Popconfirm, Radio, Select, Divider, DatePicker, LocaleProvider, Tag, Modal } from 'ant-design-vue'

Vue.config.productionTip = false
// const confirm = Modal.confirm();
Vue.prototype.$notification = notification
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

Vue.use(LocaleProvider)
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Table)
Vue.use(Col)
Vue.use(Row)
Vue.use(Popconfirm)
Vue.use(Radio)
Vue.use(Select)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(Tag)
