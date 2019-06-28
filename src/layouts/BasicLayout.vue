/* 
 * @Title: $basic layout
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-10 15:07:19 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-27 11:54:15
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

<template>
  <div>
    <a-layout id="components-layout-demo-side" class="aLayout">
      <a-layout-sider
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
        class="siderMenu"
      >
        <div class="logo">
          <img :src="jinghui" alt class="logoImg">
          <span class="sysName">案件核查平台</span>
        </div>
        <SiderMenu/>
      </a-layout-sider>
      <a-layout>
        <div class="sectorBack"></div>
        <div class="mainArea">
          <a-layout-header class="alHeader">
            <a-icon
              class="trigger"
              :type="collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="()=> collapsed = !collapsed"
            ></a-icon>
            <Header class="header"/>
          </a-layout-header>
          <a-layout-content class="content">
            <router-view></router-view>
          </a-layout-content>
          <!-- <a-layout-footer style="text-align: center">
          <Footer/>
          </a-layout-footer>-->
        </div>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
// import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import jinghui from "@/assets/jinghui.png";
export default {
  components: {
    Header,
    // Footer,
    SiderMenu
  },
  data() {
    return {
      collapsed: false,
      jinghui: jinghui
    };
  }
};
</script>

<style lang="scss" scoped>
.aLayout {
  min-height: 100vh;
}

.mainArea {
  position: relative;
}

.alHeader {
  background: #fff;
  padding: 0;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger :hover {
  color: #1890ff;
}

.logo {
  position: relative;
  height: 64px;
  padding-left: 16px;
  overflow: hidden;
  line-height: 64px;
  background: #002140;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  .logoImg {
    display: inline-block;
    height: 46px;
    width: 46px;
    transform: translateY(-4px);
  }

  .sysName {
    display: inline-block;
    color: #fff;
    font-size: 24px;
    margin: 0 0 0 12px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
    letter-spacing: 2px;
  }
}

.header {
  float: right;
  position: relative;
  height: 100%;
  padding: 0 12px 0 0;
}

.siderMenu {
  -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  z-index: 1;
}

.content {
  position: absolute;
  top: 80px;
  width: calc(100% - 30px);
  height: calc(100vh - 94px);
  background: #fff;
  padding: 10px;
  margin: 0 16px;
  overflow: hidden;
}

.sectorBack {
  position: absolute;
  height: 800px;
  width: 800px;
  border-radius: 50%;
  background-color: rgba(24,144,255,0.2);;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
}
</style>
