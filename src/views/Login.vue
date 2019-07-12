/* 
 * @Title: $user login 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-09 21:08:10 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-09 16:40:54
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

<template>
  <div class="main">
    <header class="header">
      <img class="hImg" :src="sysNamePng" />
    </header>
    <!-- <div :class="[loginSuccessAnimate?'changeLoginPanel':'']" style="z-index:2"></div> -->
    <content class="contnet">
      <div :class="[loginSuccessAnimate?'changeLoginPanel':'changeLoginPanelFalse']"></div>
      <a-form :form="form" @submit="handleSubmit" class="loginForm">
        <div class="head" style="z-index:2">欢迎登录</div>
        <a-form-item>
          <a-input
            class="inputClass"
            v-decorator="[
          'username',
          {rules: [{ required: true, message: '请输入用户名!' }]}
        ]"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="font-size:18px;color:rgba(0,0,0,.25);margin-right:16px;"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            class="inputClass"
            v-decorator="[
          'password',
          {rules: [{ required: true, message: '请输入密码!' }]}
        ]"
            type="password"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="font-size:18px;color:rgba(0,0,0,.25);margin-right:16px;"
            />
            <img :src="userName" alt />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="loginFormButton" :loading="loading">
            登 录
            <span>
              <img :src="jumpTo" alt class="jumpTo" />
            </span>
          </a-button>
        </a-form-item>
      </a-form>
    </content>
    <div class="picArea">
      <img :src="personPng" />
    </div>
    <footer class="footer">
      <div style="color:#49a9ee;font-size: 12px;">支持谷歌浏览器 版权所有 @安徽蓝盾光电子股份有限公司</div>
    </footer>
  </div>
</template>
 
 <script>
// import Vue from "vue";
// import logo from "@/assets/jinghui.png";
import sysNamePng from "@/assets/sys_name.png";
import personPng from "@/assets/person.png";
import jumpTo from "@/assets/jump_to.png";
import userName from "@/assets/user_name.png";
import passWord from "@/assets/password.png";
import { mapActions } from "vuex";
// import { getCodeByType, getCodeName } from "@/utils/pub";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      sysNamePng,
      personPng,
      userName,
      passWord,
      jumpTo,
      loginSuccessAnimate: false,
      loading: false
    };
  },
  methods: {
    ...mapActions({
      login: "user/login",
      logout: "user/logout",
      getOrgTree: "org/getOrgTree",
      getSysCodeDic: "syscode/getSysCodeDic"
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          //登录成功跳转
          this.login(values)
            .then(res => {
              if (!res || !res.status) return;
              this.getOrgTree();
              this.getSysCodeDic().then(() => {});
              this.loginSuccessAnimate = true;
              // this.$message.success(res.msg);

              // this.$router.push({ name: "annlysis" });
              this.timerFunction();
            })
            .finally(() => (this.loading = false));
        }
      });
    },
    timerFunction() {
      let that = this;
      const timer = setInterval(() => {
        // 某些定时器操作
        this.$message.success("登陆成功！");
        that.$router.push({ name: "annlysis" });
        that.loginSuccessAnimate = false;
      }, 650);
      // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
      this.$once("hook:beforeDestroy", () => {
        clearInterval(timer);
      });
    }
  }
};
</script>
 
 <style scoped>
.main {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  flex-direction: column;
  background: url("../assets/base_img.png") no-repeat;
  background-size:cover; 
}

.header {
  flex: 1;
  position: absolute;
  top: 30px;
  left: 30px;
  animation: titleLoad 1s ease;
  /* background-color: #498ee8; */
}

.footer {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  /* background-color: #fff; */
}

.contnet {
  position: absolute;
  border-radius: 8px;
  left: 200px;
  top: 30%;
  background: #f0f2f5;
  width: 580px;
  height: 360px;
  opacity: 1;
  z-index: 2;
  box-shadow: 0 12px 24px 0 rgba(7, 17, 27, 0.2);
  animation: loginLoad 1s ease;
}

.picArea {
  position: absolute;
  right: 60px;
  bottom: 2%;
  z-index: 1;
  animation: personLoad 1s ease;
}

.loginForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loginFormButton {
  width: 100%;
}

.head {
  display: flex;
  justify-content: Center;
  align-items: Center;
  top: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 34px;
  letter-spacing: 1px;
  color: #0d73ff;
}

.hImg {
  /* width: 100px; */
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
  width: 175px;
  height: 50px;
  background: #0d73ff;
  font-size: 20px;
  border-radius: 36px;
}

.inputClass {
  width: 360px;
  height: 46px;
  margin-bottom: 6px;
  font-size: 24px;
}

.jumpTo {
  margin-left: 10px;
}

:global .ant-input:not(:first-child) {
  padding-left: 40px !important;
}

.changeLoginPanel {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  -webkit-animation: loginSuccess 0.6s ease-in;
  animation: loginSuccess 0.65s ease-in;
}

.changeLoginPanelFalse {
  position: absolute;
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 8px;
}

@keyframes personLoad {
  0% {
    right: 0px;
    opacity: 0;
  }

  100% {
    right: 60px;
    opacity: 1;
  }
}

@keyframes loginLoad {
  0% {
    left: 100px;
    opacity: 0;
  }

  100% {
    left: 200px;
    opacity: 1;
  }
}

@keyframes titleLoad {
  0% {
    left: 100px;
    opacity: 0;
  }

  100% {
    left: 30px;
    opacity: 1;
  }
}

@keyframes loginSuccess {
  0% {
    height: 100%;
    background: #fff;
  }
  100% {
    height: 0;
    background: #fff;
  }
}
</style>
 
