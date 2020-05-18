<template>
  <div class="box" v-if="'/adminLog' == tagsState">
    <div class="form">
      <el-date-picker class="data" v-model="form.start" size="small" type="date" placeholder="开始日期"></el-date-picker>
      <el-date-picker class="data" v-model="form.end" size="small" type="date" placeholder="结束日期"></el-date-picker>
      <el-input class="data" v-model="form.name" size="small" placeholder="请输入用户名"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="等级" width="190"></el-table-column>
      <el-table-column prop="address" label="地址" width="300"></el-table-column>
      <el-table-column prop="data" label="日期" width="120"></el-table-column>
      <el-table-column prop="ip" label="IP" width="120"></el-table-column>
      <el-table-column prop="res" label="请求结果" width="250"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    deleteRow(index, rows) {
      console.log(index);
      rows.splice(index, 1);
    }
  },
  computed: {
    ...mapState(['tagsState'])
  },
  data() {
    return {
      form: {
        start: "",
        end: "",
        name: ""
      },
      tableData: [
        {
          id: "1",
          name: "王小虎",
          email: "2821749451@qq.com",
          address: "上海市普陀区金沙江路 1518 弄",
          data: "2019-10-15",
          res: "成功",
          ip: "127.0.0.1"
        }
      ]
    };
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
