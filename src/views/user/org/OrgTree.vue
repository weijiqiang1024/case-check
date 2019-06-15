<template>
  <a-tree
    showLine
    :treeData="treeData"
    :defaultExpandedKeys="['0-0-0']"
    @select="onSelect"
    @expand="onExpand"
  ></a-tree>
</template>
<script>
import Vue from "vue";
import { Tree } from "ant-design-vue";
Vue.use(Tree);

const treeData = [
  {
    title: "parent 1 leaf leaf leaf leaf leaf leaf leaf leaf leaf leaf",
    key: "0-0",
    slots: {
      icon: "smile"
    },
    children: [
      { title: "leaf", key: "0-0-0", slots: { icon: "meh" } },
      { title: "leaf", key: "0-0-1", scopedSlots: { icon: "custom" } }
    ]
  },
  {
    title: "parent 2",
    key: "0-1",
    slots: {
      icon: "smile"
    },
    children: [
      { title: "leaf", key: "0-0-2", slots: { icon: "meh" } },
      { title: "leaf", key: "0-0-3", scopedSlots: { icon: "custom" } }
    ]
  }
];

export default {
  data() {
    return {
      treeData: treeData
    };
  },
  methods: {
    onSelect(keys) {
      console.log("Trigger Select", keys);
    },
    onExpand() {
      console.log("Trigger Expand");
    }
  }
};
</script>
