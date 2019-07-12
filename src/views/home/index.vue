/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-10 14:50:31 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-10 18:24:27
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */
 
<template>
  <div class="home">
    <!-- <div class="sectorBack"></div> -->
    <!-- <div class="sectorBackBottom"></div> -->
    <div class="homeContent">
      <div class="leftConet">
        <div class="caseListArea">
          <div class="caseList">
            <CaseList />
          </div>
        </div>
        <div class="caseIncreaseChartArea">
          <div class="caseIncreaseChart">
            <caseIncreaseChart />
          </div>
        </div>
      </div>
      <div class="rightConet">
        <div class="caseRoseChartArea">
          <div class="caseRoseChart">
            <RadarChart />
          </div>
        </div>
        <div class="casePrecentChartArea">
          <div class="casePrecentChart">
            <div class="chartItem paddingBottom">
              <CaseItemChart />
            </div>
            <div class="chartItem paddingBottom">
              <CaseTypeChart />
            </div>
            <div class="chartItem">
              <PreCaseCount />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CaseList from "./caseList";
import RadarChart from "./caseRoseChart";
import CaseItemChart from "./caseItemChart";
import CaseTypeChart from "./caseTypeCount";
import PreCaseCount from "./preCaseCount";
import caseIncreaseChart from "./caseIncreaseChart";
export default {
  name: "home",
  components: {
    CaseList,
    RadarChart,
    CaseItemChart,
    CaseTypeChart,
    PreCaseCount,
    caseIncreaseChart
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
$padding-left: 36px;
$border-radius: 10px;
$area-background: rgba(255, 255, 255, 0.4);
$shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);

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
  background: #c5e6ff;
  transform: translate(-52%, -60%);
  -webkit-transform: translate(-52%, -60%);
}

.sectorBackBottom {
  position: absolute;
  height: 400px;
  width: 400px;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: #c5e6ff;
  transform: translate(53.5%, 53.5%);
  -webkit-transform: translate(53.5%, 53.5%);
}

.homeContent {
  position: absolute;
  width: 100%;
  height: calc(100vh - 86px);
  padding: 10px;

  .leftConet {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 68%;
    height: 100%;

    .caseListArea {
      flex: 1;
      padding-bottom: 30px;
      overflow: hidden;
      .caseList {
        width: 100%;
        height: 100%;
        padding: 0 20px;
        border-radius: $border-radius;
        background: $area-background;
        box-shadow: $shadow;
        z-index: 2;
        overflow: hidden;
      }
    }

    .caseIncreaseChartArea {
      flex: 1;
      padding-bottom: 30px;
      overflow: hidden;

      .caseIncreaseChart {
        width: 100%;
        height: 100%;
        border-radius: $border-radius;
        background: $area-background;
        box-shadow: $shadow;
        overflow: hidden;
      }
    }
  }

  .rightConet {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 68%;
    width: 31.5%;
    height: 100%;
    padding-left: $padding-left;

    .caseRoseChartArea {
      flex: 1;
      padding-bottom: 30px;
      overflow: hidden;

      .caseRoseChart {
        width: 100%;
        height: 100%;
        border-radius: $border-radius;
        background: $area-background;
        box-shadow: $shadow;
        overflow: hidden;
      }
    }

    .casePrecentChartArea {
      flex: 1;
      padding-bottom: 30px;
      overflow: hidden;

      .casePrecentChart {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .chartItem {
          flex: 1;
          overflow: hidden;
          width: 100%;
          height: 100%;
          border-radius: $border-radius;
          background: $area-background;
          box-shadow: $shadow;
        }

        .paddingBottom {
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>

