<template>
  <div style="display:flex;">
    <div class="bellCount">
      <NoticeIcon />
    </div>
    <div class="bellCount">
      <DownLoad />
    </div>
    <div class="userInfo">
      <a-avatar class="avatar" icon="user" />
      <span class="username">{{username}}</span>
      <div class="settingPanel">
        <ul>
          <li @click="changePassword">
            <a-icon type="user" />&nbsp;修改密码
          </li>
          <!-- <li>
            <a-icon type="setting" />&nbsp;账户设置
          </li> -->
          <li @click="logoutHandler">
            <a-icon type="logout" />&nbsp;退出登陆
          </li>
        </ul>
      </div>
    </div>
    <ChangePassword ref="ChangePassword"/> 
  </div>
</template>

<script>

import { mapActions } from "vuex";
import NoticeIcon from "./NoticeIcon";
import DownLoad from "./DownLoad";
import ChangePassword from '@/views/system/user/changePassword'
export default {
  components: {
    NoticeIcon,
    DownLoad,
    ChangePassword
  },
  data() {
    let userInfo = JSON.parse(sessionStorage.getItem("user_info") || "{}");
    return {
      username: (userInfo && userInfo.username) || "猫咪"
    };
  },
  mounted() {
    // console.log(this.$store.state.user,'user');
  },
  methods: {
    ...mapActions({
      logout: "user/logout"
    }),
    logoutHandler() {
      // debugger;
      this.logout()
        .then(res => this.logoutSuccess(res))
        .catch(err => this.logoutFailed(err));
    },
    logoutSuccess(res) {
      console.log(res);
      this.$router.push({ name: "login" });
    },
    logoutFailed(err) {
      console.log(err);
    },
    changePassword(){
      this.$refs.ChangePassword.add();
    }
  }
};
</script>

<style lang="scss" scoped>
.bellCount {
  position: relative;
  height: 100%;
  padding: 0 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover{
    background: rgba(0, 0, 0, 0.025);
  }
}
.userInfo {
  position: relative;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;

  .avatar {
    width: 26px;
    height: 26px;
    margin: 20px 8px 20px 0;
    font-size: 16px;
    background-color: #1890ff;
  }

  .username {
    color: rgba(0, 0, 0, 0.45);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.025);

    .settingPanel {
      visibility: visible;
      transition: all 0.3s ease;
    }
  }

  .settingPanel {
    visibility: hidden;
    outline: none;
    position: absolute;
    top: 68px;
    right: 0;
    width: 160px;
    list-style-type: none;
    padding: 4px 0;
    margin: 0;
    text-align: left;
    background-color: #fff;
    border-radius: 4px;
    z-index: 3;
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background-clip: padding-box;
    -webkit-transform: translateZ(0);
    transition: all 0.3s ease;
    //animation: name duration timing-function delay iteration-count direction fill-mode;

    &:hover {
      visibility: visible;
      transition: all 0.3s ease;
      // -webkit-animation-name: fadeInDown;
      // animation-name: fadeInDown;
    }

    ul {
      padding: 4px 0px;
      margin-block-end: 0px;
      list-style: none;
    }

    li {
      width: 160px;
      padding: 4px 12px;
      margin: 0;
      clear: both;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      white-space: nowrap;
      cursor: pointer;
      // -webkit-transition: all 0.3s;
      // transition: all 0.3s;
      line-height: 22px;

      &:hover {
        color: #1890ff;
        background: #e6f7ff;
      }
    }
  }
}
</style>
