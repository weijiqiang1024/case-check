/* 
 * @Title: $user login 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-09 21:08:10 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-10 14:54:50
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

<template>
  <div class="main">
    <header class="header"></header>
    <content class="contnet">
      <div class="head">
        <img class="hImg" :src="imglogo">
        <span class="hTitle">案件核查平台</span>
      </div>
      <a-form :form="form" @submit="handleSubmit" class="loginForm">
        <a-form-item>
          <a-input
            v-decorator="[
          'username',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="loginFormButton">登 录</a-button>
        </a-form-item>
      </a-form>
    </content>
    <footer class="footer">
      <div style="color:#49a9ee;font-size: 12px;">支持谷歌浏览器 版权所有 @安徽蓝盾光电子股份有限公司</div>
    </footer>
  </div>
</template>
 
 <script>
import logo from "@/assets/jinghui.png";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      imglogo: logo
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          //登录成功跳转
          this.$store.dispatch('user/login',values);
          this.$router.push({ name: "annlysis" });
        }
      });
    }
  }
};
</script>
 
 <style scoped>
.main {
  display: flex;
  height: 100vh;
  min-height: 100vh;
  flex-direction: column;
}

.header {
  flex: 1;
  background-color: #498ee8;
}

.footer {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  background-color: #fff;
}

.contnet {
  position: absolute;
  border-radius: 8px;
  left: 50%;
  top: 50%;
  /* background: -webkit-linear-gradient(45deg, #ffffff, #498ee8); */
  background: -webkit-linear-gradient(45deg, #498ee8, #ffffff);
  width: 700px;
  height: 360px;
  margin-left: -350px;
  margin-top: -180px;
  opacity: 1;
  box-shadow: 0 12px 24px 0 rgba(7, 17, 27, 0.2);
}

.loginForm {
  position: relative;
  left: 50%;
  width: 260px;
  margin-left: -130px;
  opacity: 1;
}

.loginFormButton {
  width: 100%;
}

.head {
  height: 160px;
  display: flex;
  justify-content: Center;
  align-items: Center;
}

.hImg {
  width: 100px;
}

.hTitle {
  width: 300px;
  font-size: 40px;
  color: white;
  text-shadow: 0 2px 2px black;
  margin-left: 20px;
  letter-spacing: 10px;
}

.loginFormButton {
  width: 100%;
}
</style>
 
