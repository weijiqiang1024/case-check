<template>
  <div class="scoreConent">
    <div class="title">案件扣分比</div>
    <div class="chart">
      <a-progress type="circle" :percent="percent" :width="80" />
    </div>
    <div class="number">
      <div>{{discountCaseNumber}}</div>
      <div class="allCount">{{allCaseNumber}}</div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import request from "@/utils/request";
import reqApi from "@/api/index";
export default {
  data() {
    return {
      discountCaseNumber: 0,
      allCaseNumber: 0,
      percent: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      request.get(reqApi.countDeductionSum, {}).then(res => {
        console.log(res);
        let temp = _.cloneDeep(res.result);
        if (temp[0].value != 0 && temp[1].value != 0)
          this.percent = Number(
            ((temp[1].value / temp[0].value) * 100).toFixed(2)
          );
        this.allCaseNumber = temp[0].value;
        this.discountCaseNumber = temp[1].value;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.scoreConent {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .title {
    flex: 1;
    text-align: center;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 700;
    letter-spacing: 2px;
    // background: rgba(0, 0, 0, 0.025);
  }

  .chart {
    flex: 1;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);

    // background: rgba(0, 0, 0, 0.025);
  }

  .number {
    flex: 1;
    text-align: center;
    font-size: 24px;
    color: rgb(16, 142, 223);
    font-weight: 700;
    // background: rgba(0, 0, 0, 0.025);

    .allCount {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .ant-progress-circle-wrap,
  .ant-progress-line-wrap {
    margin-right: 8px;
    margin-bottom: 5px;
  }
}
</style>
