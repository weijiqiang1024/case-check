<template>
  <div class="orgPage">
    <div class="treeInfo">
      <div class="treeNameArea">
        <span>组织机构</span>
      </div>
      <div class="treeArea">
        <div class="orgTreeDiv">
          <org-tree></org-tree>
        </div>
      </div>
    </div>
    <div class="mainArea">
      <div class="searchArea">
        <a-form :form="form" @submit="handleSearch" layout="inline" class="seacherForm">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="机构代码:">
                <a-input v-decorator="['username']" size="small"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="机构名称:">
                <a-input v-decorator="['password']" size="small"></a-input>
              </a-form-item>
            </a-col>
            <a-form-item>
              <a-button type="primary" size="small" html-type="submit" class="loginFormButton">查询</a-button>
            </a-form-item>
          </a-row>
        </a-form>
      </div>
      <div class="tableArea">
        <div class="buttonArea">
          <a-button type="primary" size="small" @click="addOrg" class="addBtn">添加</a-button>
          <a-button type="primary" size="small" @click="delOrg">删除</a-button>
        </div>
        <div class="tableInfo">
          <a-table :rowSelection="rowSelection" :columns="columns" :dataSource="data">
            <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {  } from "";
import orgTree from "./OrgTree";

export default {
  components: {
    "org-tree": orgTree
  },
  data() {
    return {
      form: this.$form.createForm(this),
      //表头
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "Age",
          dataIndex: "age"
        },
        {
          title: "Address",
          dataIndex: "address"
        }
      ],
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park"
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park"
        },
        {
          key: "4",
          name: "Disabled User",
          age: 99,
          address: "Sidney No. 1 Lake Park"
        }
      ]
    };
  },
  computed: {
    rowSelection() {
      //   const { selectedRowKeys } = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  },
  methods: {
    handleSearch() {},
    addOrg() {},
    delOrg() {}
  }
};
</script>

<style lang="scss" scoped>
.orgPage {
  display: flex;
  position: relative;
  height: 100%;

  .treeInfo {
    width: 20%;
  }
  .treeNameArea {
    width: 100%;
    line-height: 24px;
    height: 24px;
    background: #f0f2f5;
    letter-spacing: 2px;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 700;
    text-align: center;
  }
  .treeArea {
    position: absolute;
    width: 20%;
    height: calc(100vh - 134px);
    // background: #f0f2f5;
    overflow: auto;
    border: 1px solid #f0f2f5;
    .orgTreeDiv {
      padding: 4px 10px;
    }
  }

  .mainArea {
    position: absolute;
    left: 21%;
    width: 79%;
    height: calc(100vh - 114px);
    // background: #f0f2f5;
  }

  .searchArea {
    width: 100%;
    padding: 10px 10px;
    border: 1px solid #f0f2f5;
    overflow: hidden;
  }

  .tableArea {
    position: absolute;
    top: 80px;
    width: 100%;
    .buttonArea {
      position: absolute;
      right: 10px;
      .addBtn {
        margin-right: 10px;
      }
    }
    .tableInfo {
      position: absolute;
      width: 100%;
      top: 36px;
    }
  }
}
</style>
