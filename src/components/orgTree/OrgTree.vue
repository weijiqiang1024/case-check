<template>
<div>
  <a-tree
    showLine
    :treeData="data"
    :defaultExpandedKeys="expandedKeys"
    :autoExpandParent = "autoExpandParent"
    :defaultExpandAll="defaultExpandAll"
    @select="onSelect"
    @expand="onExpand"
  ></a-tree>
  <!-- <span>{{defaultExpandedKeys}}</span> -->
  </div>
</template>
<script>
import Vue from "vue";
import { Tree } from "ant-design-vue";
Vue.use(Tree);

export default {
  props: {
    data: {
      type: Array,
      required:true,
      default: () => []
    },
    defaultExpandedKeys:{
      type: Array,
      required:true,
      default: () => []
    }
  },
  data() {
    // let defaultExpandedKeys = [this.defaultExpandedKeys[0]];
    return {
      defaultExpandAll:false,
      autoExpandParent:true,
      expandedKeys: this.defaultExpandedKeys
    };
  },
  mounted(){
    this.defaultExpandAll = true;
  },
  methods: {
    onSelect(keys) {
      // console.log("Trigger Select", keys);
      let key = '';
      if(keys){
        key = keys[0];
      }
      this.$emit("changeSelectKey",key);
    },
    onExpand() {
      // console.log("Trigger Expand");

    }
  }
};
</script>
