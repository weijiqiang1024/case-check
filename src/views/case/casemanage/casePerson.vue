<template>
  <div class="casePerson">
    <a-button
      shape="circle"
      size="large"
      icon="plus"
      type="primary"
      class="addPersonBtn"
      @click="handleAdd"
    ></a-button>
    <a-table
      bordered
      :dataSource="dataSource"
      :columns="columns"
      size="middle"
      style="padding-top:10px"
    >
      <!-- <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)"/>
      </template>-->
      <template
        v-for="col in ['name', 'idCard', 'driverCard','plateNbr','trafficType','responsibility','phoneNbr']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            size="small"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">保存</a>
            <a-divider type="vertical"/>
            <a-popconfirm title="确定取消?" @confirm="() => cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">修改</a>
          </span>
          <a-divider type="vertical"/>
          <a-popconfirm
            v-if="dataSource.length"
            title="确定删除?"
            @confirm="() => onDelete(record.key)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
// import EditableCell from "./editTableCell";
const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    width: "10%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "身份证号",
    dataIndex: "idCard",
    width: "15%",
    scopedSlots: { customRender: "idCard" }
  },
  {
    title: "驾驶证号",
    dataIndex: "driverCard",
    width: "15%",
    scopedSlots: { customRender: "driverCard" }
  },
  {
    title: "车牌号",
    dataIndex: "plateNbr",
    width: "10%",
    scopedSlots: { customRender: "plateNbr" }
  },
  {
    title: "交通方式",
    dataIndex: "trafficType",
    width: "10%",
    scopedSlots: { customRender: "trafficType" }
  },
  {
    title: "责任",
    dataIndex: "responsibility",
    width: "5%",
    scopedSlots: { customRender: "responsibility" }
  },
  {
    title: "联系方式",
    dataIndex: "phoneNbr",
    width: "15%",
    scopedSlots: { customRender: "phoneNbr" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
    width: "15%"
  }
];
// const dataSource = [
//   {
//     key: "0",
//     name: "王晓丽",
//     idCard: "341221199909154611",
//     driverCard: "341221199909154611",
//     plateNbr: "皖A12345",
//     trafficType: "摩托车",
//     responsibility: "主",
//     phoneNbr: "15956997979"
//   },
//   {
//     key: "1",
//     name: "刘刚",
//     idCard: "341221199909154611",
//     driverCard: "341221199909154611",
//     plateNbr: "皖A12345",
//     trafficType: "摩托车",
//     responsibility: "主",
//     phoneNbr: "15956997979"
//   }
// ];
const dataSource = [];
export default {
  components: {
    // EditableCell
  },
  data() {
    this.cacheData = dataSource.map(item => ({ ...item }));
    return {
      dataSource,
      columns,
      editStatus: false, //标识在编辑状态
      count: 2
    };
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.editStatus = true;
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    handleAdd() {
      if (this.editStatus) {
        this.$message.warning("请先保存在编辑的涉案人员信息！");
        return;
      }
      const { count, dataSource } = this;
      const newData = {
        key: count,
        name: "",
        idCard: "",
        driverCard: "",
        plateNbr: "",
        trafficType: "",
        responsibility: "",
        phoneNbr: "",
        editable: true
      };
      this.dataSource = [...dataSource, newData];
      this.count = count + 1;
      this.editStatus = true;
    },
    handleChange(value, key, column) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.dataSource = newData;
      }
    },
    edit(key) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.editStatus = true;
        this.dataSource = newData;
      }
    },
    save(key) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      if (!target.name || !target.idCard || !target.phoneNbr) {
        this.$message.warning("姓名、身份证、联系方式不能为空!");
        return null;
      }
      if (target) {
        delete target.editable;
        this.editStatus = false;
        this.dataSource = newData;
        this.cacheData = newData.map(item => ({ ...item }));
      }
    },
    cancel(key) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      if (!target.name || !target.idCard || !target.phoneNbr) {
        this.$message.warning("姓名、身份证、联系方式不能为空!");
        return null;
      }
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter(item => key === item.key)[0]
        );
        delete target.editable;
        this.editStatus = true;
        this.dataSource = newData;
      }
    },
    getCasePerson() {
      console.log(this.dataSource, "casePerson");
      return this.dataSource;
    }
  }
};
</script>
<style>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-row-operations a {
  margin-right: 8px;
}

.addPersonBtn {
  position: absolute;
  right: 30px;
  height: 50px !important;
  width: 50px !important;
  top: -8px;
  box-shadow: 0px 17px 10px -10px rgba(0, 0, 0, 0.4);
  z-index: 3;
  border: 6px solid #fff;
}
.ant-table-middle
  > .ant-table-content
  > .ant-table-body
  > table
  > .ant-table-tbody
  > tr
  > td {
  padding: 8px 8px;
}

.casePerson {
  padding: 0 10px;
}
</style>