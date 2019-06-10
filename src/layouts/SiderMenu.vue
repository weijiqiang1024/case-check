<template>
  <div style="width: 256px">
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['2']"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in list">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon"/>
          <span>{{item.meta.title}}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path"/>
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import _ from "lodash";
export default {
  components: {
    "sub-menu": SubMenu
  },
  data() {
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      list: menuData
    };
  },
  methods: {
    getMenuData(routes) {
      const menuData = [];
      if (routes && _.isArray(routes)) {
        routes.forEach(item => {
          debugger;
          if (item.name && !item.hideInMenu) {
            const newItem = { ...item };
            delete newItem.children;
            if (item.children && !item.hideChildrenInMenu) {
              newItem.children = this.getMenuData(item);
            }
            menuData.push(newItem);
          } else if (
            !item.hideInMenu &&
            !item.hideChildrenInMenu &&
            item.children
          ) {
            menuData.push(...this.getMenuData(item.children));
          }
        });
      }

      return menuData;
    }
  }
};
</script>

<style>
</style>
