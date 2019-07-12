import request from '@/utils/request';
        <template>
  <div>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="超期案件" key="1">
        <div class="outerContainer">
          <div class="innerContainer">
            <div class="content">
              <div class="spinContnet">
                <a-spin :spinning="spinning" tip="Loding"></a-spin>
              </div>
              <div :style="`display:${data.length == 0?'block':'none'}`" class="noData">暂无数据</div>
              <div v-for="item in data" :key="item.caseId">
                <div class="itemDiv">
                  <div class="happenAddress">{{item.happenAddress}}</div>
                  <div class="happenTime">{{item.happenTime}}</div>
                  <div class="hurtDath">{{item.hurtNbr+'/'+item.deathNbr}}</div>
                  <div class="processPerson">{{item.processPerson}}</div>
                  <div class="processType">{{item.processType=='1'?'简易':'一般'}}</div>
                  <div class="status">
                    <span class="statusLabel">{{$getCodeName("001", item.status)}}</span>
                  </div>
                  <div class="itemOptions">
                    <span>
                      <a @click="handleCaseDeal(item)">处理</a>
                      <a-divider type="vertical" />
                      <a @click="viewData(item)">查看</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="到期案件" key="2" forceRender>
        <div class="outerContainer">
          <div class="innerContainer">
            <div class="content">
              <div class="spinContnet">
                <a-spin :spinning="spinning2" tip="Loding"></a-spin>
              </div>
              <div :style="`display:${willData.length == 0?'block':'none'}`" class="noData">暂无数据</div>
              <div v-for="item in willData" :key="item.caseId">
                <div
                  class="itemDiv willItemDiv"
                  style="border-left:12px solid rgba(57, 159, 254,.8)"
                >
                  <div class="happenAddress">{{item.happenAddress}}</div>
                  <div class="happenTime">{{item.happenTime}}</div>
                  <div class="hurtDath">{{item.hurtNbr+'/'+item.deathNbr}}</div>
                  <div class="processPerson">{{item.processPerson}}</div>
                  <div class="processType">{{item.processType=='1'?'简易':'一般'}}</div>
                  <div class="status">
                    <span class="statusLabel">{{$getCodeName("001", item.status)}}</span>
                  </div>
                  <div class="itemOptions">
                    <span>
                      <a @click="handleCaseDeal(item)">处理</a>
                      <a-divider type="vertical" />
                      <a @click="viewData(item)">查看</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <editModal ref="editForm" :handleEditOk="handleEditOk" :codeType="codeType" :processPersonArr="processPersonArr"/>
    <caseDealModal ref="caseDealForm" :handleCaseDealOk="handleCaseDealOk" :codeType="codeType" :processPersonArr="processPersonArr"/>
  </div>
</template>
<script>
import request from "@/utils/request";
import reqApi from "@/api";
import caseDealModal from "@/views/case/casemanage/caseDealModal";
import editModal from "@/views/case/casemanage/editModal";

export default {
  components: {
    editModal,
    caseDealModal
  },
  data() {
    return {
      loading: true,
      spinning: true,
      spinning2: true,
      loadingMore: false,
      showLoadingMore: true,
      selectKey: "1",
      data: [], //超期数据
      willData: [], //即将到期数据
      codeType: [],
      processPersonArr:[]
    };
  },
  mounted() {
    this.getData();
    this.getProcessPerson();
  },
  methods: {
    callback(key) {
      console.log(key);
      if (key != this.selectKey) {
        this.selectKey = key;
        if (key == "1") {
          this.getData();
        } else {
          this.getWillData();
        }
      }
    },
    getData() {
      let query = { isTimeout: "2" };
      request
        .get(reqApi.caseList, query)
        .then(res => {
          // this.spinning = false;
          this.data = res.result.rows;
        })
        .finally(() => (this.spinning = false));
    },
    getWillData() {
      let query = { isTimeout: "1" };
      request
        .get(reqApi.caseList, query)
        .then(res => {
          this.spinning2 = false;
          this.willData = res.result.rows;
        })
        .finally(() => (this.spinning = false));
    },
    onLoadMore() {
      this.loadingMore = true;
      this.getData(res => {
        this.data = this.data.concat(res.results);
        this.loadingMore = false;
        this.$nextTick(() => {
          window.dispatchEvent(new Event("resize"));
        });
      });
    },
    handleCaseDeal(record) {
      //修改点击
      if (!record) return;
      this.$refs.caseDealForm.edit(record, true);
    },
    handleCaseDealOk(values) {
      //修改完成请求方法
      request
        .post(reqApi.changeStatus, values)
        .then(res => {
          this.$message.success(res.msg);
          this.$refs.caseDealForm.handleCancel();
          this.getData();
        })
        .finally(() => (this.$refs.caseDealForm.confirmLoading = false));
    },
    handleEditOk() {},
    viewData(record) {
      //信息查看
      if (!record) return;
      this.$refs.editForm.edit(record, true);
    },
    getProcessPerson() {
      request.get(reqApi.userList).then(res => {
        if (!res) return;
         this.processPersonArr = res.result.rows;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.outerContainer {
  width: 100%;
  height: 330px;
  position: relative;
  transform: translateY(-10px);
  overflow: hidden;
}

.innerContainer {
  position: absolute;
  left: 0;
  width: 102%;
  overflow-x: hidden;
  overflow-y: scroll;
}

.content {
  width: 100%;
  height: 330px;
}

.itemDiv {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 54px;
  margin: 10px 0;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-left: 12px solid rgba(255, 0, 0, 0.5);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.8);

  .happenTime {
    width: 20%;
  }

  .happenAddress {
    width: 30%;
  }

  .hurtDath {
    width: 10%;
  }

  .processPerson {
    width: 10%;
  }

  .processType {
    width: 10%;
  }
  .status {
    width: 10%;
    text-align: center;
  }
  .statusLabel {
    padding: 2px 8px;
    border-radius: 4px;
    color: #1890ff;
    background: #e6f7ff;
    border-color: #91d5ff;
  }
  .itemOptions {
    width: 10%;
    text-align: center;
  }

  .willItemDiv {
    border-left: 12px solid rgb(57, 159, 254) !important;
  }
}
.spinContnet {
  // text-align: center;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.noData {
  text-align: center;
  padding: 10px;
}
</style>
