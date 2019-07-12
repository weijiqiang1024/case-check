<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="通知" key="1">
            <a-list>
              <a-list-item @click="dealCase('chaoqi')" class="listItem">
                <a-list-item-meta
                  :title="`有 ${matureObj.chaoqi} 条案件超期未处理消息`"
                  :description="timeTemap"
                >
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"
                  />
                </a-list-item-meta>
              </a-list-item>
              <a-list-item @click="dealCase('daoqi')" class="listItem">
                <a-list-item-meta
                  :title="`有 ${matureObj.daoqi} 条案件到期未处理消息`"
                  :description="timeTemap"
                >
                  <a-avatar
                    style="background-color: white"
                    slot="avatar"
                    src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"
                  />
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <!-- <a-tab-pane tab="消息" key="2">
            123
          </a-tab-pane>
          <a-tab-pane tab="待办" key="3">
            123
          </a-tab-pane>-->
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef" title="消息通知">
      <a-badge :count="(matureObj.chaoqi + matureObj.daoqi)">
        <a-icon style="font-size: 16px; padding: 4px" type="bell"/>
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  name: "HeaderNotice",
  data() {
    return {
      loadding: false,
      visible: false,
      timeTemap: "刚刚"
    };
  },
  computed: {
    ...mapState({
      matureMessage: state => state.socket.matureMessage, //websocket 推送的案件处理信息
      matureObj: state => state.socket.matureObj, //websocket 推送的案件处理信息
      time: state => state.socket.time //websocket 推送的案件处理信息
    })
  },
  methods: {
    fetchNotice() {
      if (!this.visible) {
        this.loadding = true;
        setTimeout(() => {
          this.loadding = false;
        }, 1000);
      } else {
        this.loadding = false;
      }
      this.visible = !this.visible;
    },
    dealCase(type) {
      this.$router.push({
        path: "/case/casemanage",
        query: {
          type: type
        }
      });
    },
    beautifyTime(timestamp) {
      if (!timestamp) return;
      var mistiming = Math.round(new Date() / 1000) - moment(timestamp) / 1000;
      var postfix = mistiming > 0 ? "前" : "后";
      mistiming = Math.abs(mistiming);
      var arrr = ["年", "个月", "星期", "天", "小时", "分钟", "秒"];
      var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];

      for (var i = 0; i < 7; i++) {
        var inm = Math.floor(mistiming / arrn[i]);
        if (inm != 0) {
          // return inm + arrr[i] + postfix;
          this.timeTemap = inm + arrr[i] + postfix;
        }
      }
    }
  },
  watch: {
    matureMessage: function() {
      // this.matureObj = Object.assign({}, this.matureObj);
    },
    time: function() {
      this.beautifyTime(this.time);
    }
  }
};
</script>

<style lang="css">
.header-notice-wrapper {
  top: 50px !important;
}
</style>
<style lang="scss" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}

.listItem{
  cursor: pointer;

  &:hover{
    background: rgba(0,0,0,0.025)
  }
}
</style>
