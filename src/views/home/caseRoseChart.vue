<template>
  <div class="scoreConent">
    <div class="radarChartArea" ref="radarChartArea">
      <div class="radarChart"></div>
    </div>
    <div class="chartName">案件处理环节延期占比</div>
  </div>
</template>

<script>
import _ from "lodash";
import RadarChart from "@/lib/radarChart";
import d3 from "d3";
import request from "@/utils/request";
import reqApi from "@/api/index";
export default {
  data() {
    return {
      sourceData: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      request.get(reqApi.countProcessCount, {}).then(res => {
        console.log(res);
        let temp = _.cloneDeep(res.result);
        let count = 0;
        temp.map(item => (count += item.value));
        if (count != 0)
          temp.map(item => (item.value = (item.value / count).toFixed(2)));
        this.sourceData.length = 0;
        this.sourceData.push(temp);
        this.initRadarChart(this.sourceData);
      });
    },
    initRadarChart(data) {
      console.log(data);
      var margin = { top: 40, right: 0, bottom: 40, left: 0 },
        // width =
        //   Math.min(360, window.innerWidth - 600) - margin.left - margin.right,
        // height = Math.min(
        //   width-20,
        //   window.innerHeight - margin.top - margin.bottom - 20
        // );
        width =
          this.$refs.radarChartArea.clientWidth - margin.left - margin.right,
        height =
          this.$refs.radarChartArea.clientHeight -
          margin.top -
          margin.bottom -
          20;

      //////////////////////////////////////////////////////////////
      ////////////////////////// Data //////////////////////////////
      //////////////////////////////////////////////////////////////

      // var data1 = [
      //   //   [//iPhone
      //   // 	{axis:"Battery Life",value:0.22},
      //   // 	{axis:"Brand",value:0.28},
      //   // 	{axis:"Contract Cost",value:0.29},
      //   // 	{axis:"Design And Quality",value:0.17},
      //   // 	{axis:"Have Internet Connectivity",value:0.22},
      //   // 	{axis:"Large Screen",value:0.02},
      //   // 	{axis:"Price Of Device",value:0.21},
      //   // 	{axis:"To Be A Smartphone",value:0.50}
      //   //   ],[//Samsung
      //   // 	{axis:"Battery Life",value:0.27},
      //   // 	{axis:"Brand",value:0.16},
      //   // 	{axis:"Contract Cost",value:0.35},
      //   // 	{axis:"Design And Quality",value:0.13},
      //   // 	{axis:"Have Internet Connectivity",value:0.20},
      //   // 	{axis:"Large Screen",value:0.13},
      //   // 	{axis:"Price Of Device",value:0.35},
      //   // 	{axis:"To Be A Smartphone",value:0.38}
      //   //   ],
      //   // [
      //   //   //Nokia Smartphone
      //   //   { axis: "事故确认", value: 0.26 },
      //   //   { axis: "处罚", value: 0.1 },
      //   //   { axis: "委托", value: 0.3 },
      //   //   { axis: "鉴定结论", value: 0.14 },
      //   //   { axis: "送达", value: 0.22 },
      //   //   { axis: "重新委托", value: 0.04 },
      //   //   { axis: "重新鉴定结论", value: 0.41 },
      //   //   { axis: "重新送达", value: 0.11 },
      //   //   { axis: "证据公开", value: 0.41 }
      //   //   // {axis:"To Be A Smartphone",value:0.30}
      //   // ]
      // ];
      //////////////////////////////////////////////////////////////
      //////////////////// Draw the Chart //////////////////////////
      //////////////////////////////////////////////////////////////

      var color = d3.scale.ordinal().range([
         "#304bd4"
        // "#657CD9"
        // "#CC333F",
        // "#00A0B0"
      ]);

      var radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: 0.5,
        levels: 5,
        roundStrokes: true,
        color: color
      };
      //Call function to draw the Radar chart
      RadarChart(".radarChart", data, radarChartOptions, d3);
    }
  }
};
</script>

<style lang="scss" scoped>
.scoreConent {
  width: 100%;
  height: 100%;

  .radarChartArea {
    height: 92%;
    font-family: "Open Sans", sans-serif;
    font-size: 11px;
    font-weight: 300;
    fill: #242424;
    text-align: center;
    text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
    cursor: default;
  }

  .chartName {
    width: 100%;
    text-align: center;
    letter-spacing: 2px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>

<style lang="scss">
.legend {
  font-family: "Raleway", sans-serif;
  fill: #666;
  font-size: 12px !important;
  letter-spacing: 1px;
}
.tooltip {
  fill: red;
}
</style>

