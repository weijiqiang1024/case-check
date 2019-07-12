<template>
  <div class="scoreConent">
    <div class="title">案件类型比</div>
    <div class="chart">
      <div :style="{ width:'100%', height:'100%' }" :id="id"></div>
    </div>
    <div class="number">
      <div class="easy">{{easyCaseNumber}}</div>
      <div class="normal">{{normalCaseNumber}}</div>
    </div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import _ from "lodash";
import request from "@/utils/request";
import reqApi from "@/api/index";
export default {
  data() {
    return {
      width: 100,
      height: 100,
      id: "__count",
      easyCaseNumber: 0,
      normalCaseNumber: 0,
      chart: "",
      charData: [
        {
          item: "一般",
          count: 40,
          percent: 0.4
        },
        {
          item: "简易",
          count: 21,
          percent: 0.2
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      request.get(reqApi.countCaseType, {}).then(res => {
        console.log(res);
        let tempData = _.cloneDeep(res.result);
        let temp = [];
        tempData.map((item, index) => {
          if (!temp[index]) temp[index] = {};
          temp[index]["item"] = item.type.substring(0,2);
          temp[index]["count"] = item.value;
        });
        let total = temp[0].count + temp[1].count;
        if (total != 0) {
          temp[0].percent = Number((temp[0].count / total).toFixed(2));
          temp[1].percent = Number((temp[1].count / total).toFixed(2));
        } else {
          temp[0].percent = 0;
          temp[1].percent = 0;
        }
        this.easyCaseNumber = temp[0].count;
        this.normalCaseNumber = temp[1].count;
        this.charData = temp;
        this.drawChart(this.charData);
      });
    },
    drawChart(data) {
      const { height, id } = this;
      this.chart && this.chart.destroy();
      this.chart = new G2.Chart({
        id: id,
        forceFit: true,
        height: height,
        animate: false,
        padding: [0, 0]
      });
      this.chart.source(data);

      this.chart.coord("theta", {
        radius: 0.6,
        innerRadius: 0.5
      });
      this.chart.tooltip({
        showTitle: false,
        itemTpl:
          '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });

      var interval = this.chart
        .intervalStack()
        .position("percent")
        .color("item")
        .label("percent", {
          formatter: function formatter(val, item) {
            return item.point.item + ": " + val * 100 + "%    ";
          }
        })
        .tooltip("item*percent", function(item, percent) {
          percent = percent * 100 + "%";
          return {
            name: item,
            value: percent
          };
        })
        .style({
          lineWidth: 1,
          stroke: "#fff"
        });
      this.chart.render();
      interval.setSelected(data[0]);
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
    letter-spacing: 2px;
    font-weight: 700;
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
    font-size: 20px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: 700;
    // background: rgba(0, 0, 0, 0.025);

    .easy{
        color: #399ffe;
    }
    .normal{
        color: #35CAC9;
    }
  }

  .ant-progress-circle-wrap,
  .ant-progress-line-wrap {
    margin-right: 8px;
    margin-bottom: 5px;
  }
}
</style>
