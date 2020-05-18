<template>
  <div class="box">
    <div class="form">
      <el-input class="data" v-model="form.name" size="small" placeholder="请输入名称"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="user">搜索</el-button>
    </div>
    <el-table
      :data="uselList"
      border
      size="small"
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="userId" label="id"></el-table-column>
      <el-table-column prop="userName" label="名称" width="200"></el-table-column>
      <el-table-column prop="userEmail" label="邮箱" width="180"></el-table-column>
      <el-table-column label="电话" width="180">
        <template slot-scope="scope">{{scope.row.userPhone==null?"未认证":scope.row.userPhone}}</template>
      </el-table-column>
      <el-table-column prop="registerTime" label="注册时间" :formatter="setDate" width="200"></el-table-column>
      <el-table-column prop="registerIp" label="注册IP" width="200"></el-table-column>
      <el-table-column prop="res" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >删除</el-button>
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pages"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        name: ""
      },
      pages: 1,
      pageSize: 10,
      total: 0,
      uselList: []
    };
  },
  methods: {
    handleCurrentChange() {
      this.user()
    },
    handleSizeChange() {
      this.user()
    },
    user() {
      this.$api
        .posrUser({
          userName: this.form.name,
          code: 1,
          pageSize: this.pageSize,
          pageCode: this.pages
        })
        .then(res => {
          this.uselList = res.userInfoAll.list;
          this.total = res.userInfoAll.total;
          console.log(res);
        });
    },
    setDate(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    this.user();
  }
};
</script>
<style scoped>
.form {
  padding-bottom: 10px;
}
.form .data {
  width: 150px;
  margin-right: 10px;
}
.right {
  margin-top: 10px;
  text-align: right;
}
</style>
