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
            @click.native.prevent="deleteRow(scope.$index, uselList)"
            type="text"
            size="small"
          >修改</el-button>
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
    <el-dialog title="修改权限" :visible.sync="updateState" width="30%">
      <el-radio-group v-model="newjur">
        <el-radio :label="2">管理员</el-radio>
        <el-radio :label="3">用户</el-radio>
        <el-radio :label="4">封禁</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateState = false">取 消</el-button>
        <el-button type="primary" @click="jarState">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(["userName"])
  },
  data() {
    return {
      form: {
        name: ""
      },
      pages: 1,
      pageSize: 10,
      total: 0,
      uselList: [],
      updateState: false,
      oldjur: 1,
      newjur: 1,
      updateId: 0
    };
  },
  methods: {
    handleCurrentChange() {
      this.user();
    },
    handleSizeChange() {
      this.user();
    },
    deleteRow(index, data) {
      this.updateState = true;
      this.oldjur = data[index].userState;
      this.newjur = this.oldjur
      this.updateId = data[index].userId
      console.log(this.jur)
      console.log(data[index].userState);
      console.log(index, data);
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
    },
    jarState(){
      this.updateState = false
      console.log(this.userName)
      this.$api.posrJur({id: this.updateId,adminName: this.userName,oldState: this.oldjur,newState: this.newjur}).then(res=> {
        if(res.code == 0) {
           this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        });
        }else {
          this.$notify.error({
          title: '错误',
          message: res.msg
        });
        }
        console.log(res)
      })
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
