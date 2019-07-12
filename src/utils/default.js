/* 
 * @Title: $一些默认配置
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-13 16:13:33 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-12 11:24:18
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */
import Vue from 'vue'
import { notification, message, Button, Form, Input, InputNumber, Icon, Layout, Menu, Table, Col, Row, Popconfirm, Radio, Select, Divider, DatePicker, LocaleProvider, Tag, Modal, Steps, Tabs, List, Popover, Spin, Badge, Avatar, Progress, Upload, Checkbox, Dropdown } from 'ant-design-vue';
import Auth from '@/directives/auth.js'

import { getCodeByType, getCodeName } from './pub'

Vue.config.productionTip = false

Vue.prototype.$notification = notification
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

Vue.prototype.$getCodeByType = getCodeByType
Vue.prototype.$getCodeName = getCodeName

Vue.use(LocaleProvider)
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(InputNumber)
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
Vue.use(Steps)
Vue.use(Tabs)
Vue.use(List)
Vue.use(Popover)
Vue.use(Spin)
Vue.use(Badge)
Vue.use(Avatar)
Vue.use(Progress)
Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(Auth)
Vue.use(Dropdown)
