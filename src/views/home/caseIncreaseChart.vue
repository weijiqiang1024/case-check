<template>
  <div class="scoreConent">
    <div class="chart" ref="chatsDiv">
      <div :style="{ width:'100%', height:'100%' }" :id="id"></div>
    </div>
    <div class="chartName">案件新增和处理数量</div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import { DataSet } from "@antv/data-set";
import _ from "lodash";
import request from "@/utils/request";
import reqApi from "@/api/index";
export default {
  data() {
    return {
      width: 800,
      height: 360,
      id: "_dayIncrease",
      chart: "",
      charData: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      request.get(reqApi.countCaseSumByDay, {}).then(res => {
        let temp = _.cloneDeep(res.result);
        this.charData.length = 0;
        this.charData = temp;
        this.drawChart(this.charData);
      });
    },
    drawChart(data) {
      const { height, width, id } = this;
      let pHeight = this.$refs.chatsDiv.clientHeight;
      var ds = new DataSet();
      var dv = ds.createView().source(data);
      // fold 方式完成了行列转换，如果不想使用 DataSet 直接手工转换数据即可
      dv.transform({
        type: "fold",
        fields: ["新增", "完成"], // 展开字段集
        key: "time", // key字段
        value: "number" // value字段
      });

      this.chart && this.chart.destroy();
      this.chart = new G2.Chart({
        container: id,
        forceFit: true,
        width: width,
        height: pHeight || height,
        animate: false,
        padding: [60, 40, 30, 60]
      });
      this.chart.source(dv, {
        day: {
          range: [0, 1]
        }
      });
      this.chart.tooltip({
        crosshairs: {
          type: "line"
        }
      });
      this.chart.axis("number", {
        label: {
          formatter: function formatter(val) {
            return val;
          }
        }
      });
      this.chart
        .line()
        .position("day*number")
        .color("time")
        // .color("l(90) 0:#004bff 1:#00b2fe")
        .shape("smooth");
      this.chart
        .point()
        .position("day*number")
        .color("time")
        .size(4)
        .shape("circle")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });

      //图例
      this.chart.legend({
        mode: false,
        position: "top", // 图例的显示位置，有 'top','left','right','bottom'四种位置，默认是'right'。
        title: "示例",
        dy: 5
      });
      this.chart.render();
    }
  }
};
</script>

<style lang="scss" scoped>
.scoreConent {
  width: 100%;
  height: 100%;

  .chart {
    // flex: 1;
    height: 90%;
    width: 100%;
    padding: 0px 10px 20px 10px;
    text-align: center;
    color: rgba(0, 0, 0, 0.65);

    // background: rgba(0, 0, 0, 0.025);
  }

  .chartName {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    letter-spacing: 2px;
    color: rgba(0, 0, 0, 0.55);
  }
}
</style>
