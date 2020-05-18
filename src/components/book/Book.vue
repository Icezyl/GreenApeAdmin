<template>
  <div class="box">
    <div class="form">
      <el-input class="data" v-model="form.name" size="small" placeholder="请输入书名"></el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="book">搜索</el-button>
    </div>
    <el-table
      :data="list"
      border
      size="small"
      style="width: 100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column prop="novelId" label="id"></el-table-column>
      <el-table-column prop="novelName" label="书名" width="200"></el-table-column>
      <el-table-column prop="authorName" label="作者" width="190"></el-table-column>
      <el-table-column prop="categoryLable" label="类型" width="150"></el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">{{scope.row.novelState==1?"已完结":"连载中"}}</template>
      </el-table-column>
      <el-table-column prop="latestChapters" label="最新章节" width="200"></el-table-column>
      <el-table-column prop="res" label="操作">
         <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          查看
        </el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageCode"
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
export default {
  data() {
    return {
      form: {
        name: ""
      },
      total: 0,
      pageSize: 10,
      pageCode: 1,
      list: []
    };
  },
  mounted() {
    this.book();
  },
  methods: {
    book() {
      this.$api
        .postBook({ novelName: this.form.name, pageCode: this.pageCode, pageSize: this.pageSize })
        .then(res => {
          this.total = res.books.total;
          this.list = res.books.list;
          console.log(res);
        });
    },
    handleSizeChange() {
      this.book()
    },
    handleCurrentChange() {
      this.book()
    }
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
