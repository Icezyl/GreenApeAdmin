<template>
  <div class="box">
    <div class="form">
      <el-input class="data" v-model="form.name" size="small" placeholder="请输入名称"></el-input>
      <el-select v-model="form.state" class="data" size="small" placeholder="请选择用户状态">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" size="small" @click="search(form)">搜索</el-button>
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
            @click.native.prevent="deleteRow(scope.$index, uselList)"
            type="text"
            size="small"
          >还原</el-button>
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userName"])
  },
  data() {
    return {
      form: {
        name: "",
        state: ""
      },
      pages: 1,
      pageSize: 10,
      total: 0,
      uselList: [],
      options: [
        {
          id: 0,
          name: "全部"
        },
        {
          id: 4,
          name: "删除"
        },
        {
          id: 5,
          name: "封禁"
        }
      ]
    };
  },
  methods: {
    handleCurrentChange() {},
    handleSizeChange() {},
    setDate(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    deleteRow(index, data) {
      console.log(data);
      this.$confirm("此操作将还原该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .posrJur({
              id: data[0].userId,
              adminName: this.userName,
              oldState: data[0].userState,
              newState: 3
            })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "还原成功"
                });
              } else {
                 this.$message.error(res.msg);
              }
              this.lj()
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    lj() {
      this.$api
        .postLj({
          userName: this.form.name,
          userState: this.form.state,
          pageSize: this.pageSize,
          pageCode: this.pages
        })
        .then(res => {
          this.uselList = res.userInfoSpecial.list;
          this.total = res.userInfoSpecial.total;
          console.log(res);
        });
    }
  },
  mounted() {
    this.lj();
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
