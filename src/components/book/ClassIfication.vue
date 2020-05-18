<template>
  <div class="classification flex">
    <div class="list">
      <h3 class="title">
        类型列表
        <!-- <el-button class="add" type="primary" @click="addType = true">添加</el-button> -->
      </h3>
      <div class="lists">
        <ul>
          <li
            v-for="item in list"
            :key="item.id"
            :class="{active: item.categoryId==activeId}"
            @click="activeList(item)"
          >{{item.categoryLable}}</li>
        </ul>
      </div>
    </div>
    <div class="dets">
      <h3 class="title">信息列表</h3>
      <div class="tab">
        <el-table
          :data="typeList"
          border
          style="width: 100%"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        >
          <el-table-column prop="novelName" label="书名" width="220"></el-table-column>
          <el-table-column prop="authorName" label="作者" width="180"></el-table-column>
          <el-table-column prop="novelComment" label="评分" width="120"></el-table-column>
          <el-table-column prop="novelTags" label="标签" width="120"></el-table-column>
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">{{scope.row.novelState==1?"已完结":"连载中"}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, typeList)"
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
      </div>
    </div>
    <el-dialog title="添加分类" :visible.sync="addType" width="35%">
      <el-form :model="form">
        <el-form-item label="类型名称" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addType = false" class="small">取 消</el-button>
        <el-button type="primary" @click="addType = false" class="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeId: 1,
      activeName: "",
      addType: false,
      form: {
        name: ""
      },
      pages: 1,
      list: [],
      typeList: [],
      total: 0,
      pages: 1,
      pageSize: 10
    };
  },
  mounted() {
    // this.activeName = this.list.categoryLable;
    this.category();
  },
  methods: {
    handleSizeChange() {
      this.categoryList();
    },
    handleCurrentChange() {
      this.categoryList();
    },
    activeList(item) {
      this.activeId = item.categoryId;
      this.activeName = item.categoryLable;
      this.categoryList();
    },
    category() {
      this.$api.getCategory().then(res => {
        this.list = res.category;
        this.activeName = this.list[0].categoryLable;
        console.log(res, this.activeName);
        this.categoryList();
      });
    },
    categoryList() {
      this.$api
        .postTags({
          novelTags: this.activeName,
          pageCode: this.pages,
          pageSize: this.pageSize
        })
        .then(res => {
          this.typeList = res.bookByTagInfo.list;
          this.total = res.bookByTagInfo.total;
          console.log(res);
        });
    }
  }
};
</script>
<style scoped>
.classification {
  justify-content: space-between;
  width: 100%;
}
.title {
  font-size: 14px;
  padding: 12px 16px;
  background: #fafafa;
}
.list {
  height: 610px;
  width: 20%;
  background: #fff;
}
.lists {
  flex-shrink: 0;
  padding: 15px;
  height: 520px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.lists::-webkit-scrollbar {
  display: none; /*隐藏滚动条*/
}
.lists ul li {
  padding: 14px 24px;
  cursor: pointer;
}
.lists ul li:hover {
  color: #2d8cf0;
}
.active {
  background: #f0faff;
  color: #2d8cf0;
  border-left: 3px solid #2d8cf0;
}
.mini {
  font-size: 12px;
  height: 19px;
  padding: 2px 7px;
}
.add {
  font-size: 12px;
  height: 19px;
  padding: 2px 7px;
  float: right;
}
.small {
  font-size: 12px;
  padding: 10px 15px;
}
.dets {
  background: #fff;
  width: 78%;
}
.tab {
  padding: 16px;
}
.type {
  margin-bottom: 10px;
}
.right {
  margin-top: 10px;
  text-align: right;
}
</style>
