/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-10 14:50:31 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-27 14:23:26
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */
 
<template>
  <div class="home">
    <div class="sectorBack"></div>
    <div class="homeContent">content page</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  components: {
    // HelloWorld
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.home {
  /* width: 100%; */
  position: relative;
  height: calc(100vh - 94px);
  margin: -10px; //覆盖页面共用样式
  background: #f0f2f5;
}
.sectorBack {
  position: absolute;
  height: 800px;
  width: 800px;
  border-radius: 50%;
  // background: rgba(24, 144, 255, 0.2);
  background: #C5E6FF;
  transform: translate(-52%, -60%);
  -webkit-transform: translate(-52%, -60%);
  
}

.homeContent{
  position: absolute;
  padding:10px;
}
</style>

