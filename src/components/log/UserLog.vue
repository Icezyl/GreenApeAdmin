<template>
  <div class="box" v-if="'/userLog' == tagsState">
    <div class="form">
      <el-date-picker
        class="data"
        value-format="yyyy-MM-dd"
        v-model="form.start"
        size="small"
        type="date"
        placeholder="开始日期"
      ></el-date-picker>
      <el-date-picker
        class="data"
        value-format="yyyy-MM-dd"
        v-model="form.end"
        size="small"
        type="date"
        placeholder="结束日期"
      ></el-date-picker>
      <el-input class="data" v-model="form.name" size="small" placeholder="请输入用户名"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="search(form)">搜索</el-button>
    </div>
    <el-table
      :data="userLog"
      border
      size="small"
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="userId" label="id"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
      <el-table-column prop="userEmail" label="邮箱" width="190"></el-table-column>
      <el-table-column prop="loginAddress" label="地址" width="350"></el-table-column>
      <el-table-column prop="loginTime" :formatter="setDate" label="日期" width="170"></el-table-column>
      <el-table-column prop="loginIp" label="IP" width="170"></el-table-column>
      <el-table-column prop="res" label="请求结果"></el-table-column>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        start: "",
        end: "",
        name: "",
        path: ""
      },
      userLog: [],
      pages: 1,
      total: 0,
      pageSize: 10
    };
  },
  computed: {
    ...mapState(["tagsState"])
  },
  methods: {
    handleSizeChange(){
      this.setlog();
    },
    handleCurrentChange() {
      this.setlog();
    },
    handleClick(row) {
      console.log(row);
    },
    deleteRow(index, rows) {
      console.log(index);
      rows.splice(index, 1);
    },
    setlog(name, date = "", end = "", code = this.pages, size = this.pageSize) {
      console.log(this.form);
      this.$api
        .postUserLog({
          userName: name,
          startDate: date,
          endDate: end,
          pageCode: code,
          pageSize: size
        })
        .then(res => {
          this.userLog = res.loginLogInfo.list;
          this.total = res.loginLogInfo.total;
          console.log(res);
        });
    },
    setDate(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    search(form) {
      this.setlog(form.name, form.start, form.end, 1, 10);
    }
  },
  mounted() {
    this.setlog();
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
