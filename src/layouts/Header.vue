<template>
  <div>
    <div class="userInfo">
      <a-avatar class="avatar" icon="user"/>
      <span class="username">{{username}}</span>
      <div class="settingPanel">
        <ul>
          <li>个人中心</li>
          <li>账户设置</li>
          <li>退 出</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Avatar } from "ant-design-vue";
export default {
  components: {
    "a-avatar": Avatar
  },
  data() {
    return {
      username: "魔法喵咪"
    };
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  position: relative;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;

  .avatar {
    margin: 20px 8px 20px 0;
    background-color: #1890ff;
  }

  .username {
    color: rgba(0, 0, 0, 0.45);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.025);

    .settingPanel {
      visibility: visible;
      transition: all 0.3s ease-out;
    }
  }

  .settingPanel {
    visibility: hidden;
    outline: none;
    position: absolute;
    top: 68px;
    right: 0;
    width: 120px;
    list-style-type: none;
    padding: 4px 0;
    margin: 0;
    text-align: left;
    background-color: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    background-clip: padding-box;
    -webkit-transform: translateZ(0);
    transition: all 0.3s ease-out;

    &:hover {
      visibility: visible;
    }
  }
}

@keyframes show-gradient {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
