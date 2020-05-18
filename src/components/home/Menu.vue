<template>
  <el-menu
    class="no menu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="teleState"
    :class="{th:!teleState}"
    :unique-opened="true"
    text-color="#fff"
    active-text-color="#0aa487"
    background-color="#001529"
    :router="true"
  >
    <el-menu-item class="logo">
      <img src="@/assets/img/Chimpanzee.png" alt />
      <span slot="title">GreenApeAdmin</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-custom"></i>
        <span slot="title">人员管理</span>
      </template>
      <el-menu-item
        index="/userPersonnel"
        @click="installtTags('用户管理', '人员管理', '/userPersonnel')"
      >用户管理</el-menu-item>
      <el-menu-item index="/jurisdiction" @click="installtTags('权限管理', '人员管理', '/jurisdiction')">权限管理</el-menu-item>
      <el-menu-item index="/recovery" @click="installtTags('垃圾场', '人员管理', '/recovery')">垃圾场</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-reading"></i>
        <span slot="title">书籍管理</span>
      </template>
      <el-menu-item index="/book" @click="installtTags('书籍信息', '书籍管理', '/book')">书籍信息</el-menu-item>
      <el-menu-item index="/classIfication" @click="installtTags('分类管理', '书籍管理', '/classIfication')">分类管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-document-copy"></i>
        <span slot="title">用户日志</span>
      </template>
      <el-menu-item index="/userLog" @click="installtTags('用户登录日志', '用户日志', '/userLog')">用户登录日志</el-menu-item>
      <el-menu-item index="/adminLog" @click="installtTags('管理员登录日志', '用户日志', '/adminLog')">管理员登录日志</el-menu-item>
    </el-submenu>
    <el-menu-item index="/swagger" @click="installtTags('Swagger接口文档', '接口文档', '/swagger')">
      <i class="el-icon-document"></i>
      <span slot="title">Swagger接口文档</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["teleState"])
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    ...mapMutations(["setTagsList"]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    installtTags(val, father, router) {
      this.setTagsList({ name: val, father: father, router: router });
    }
  }
};
</script>
<style scoped>
.el-menu {
  height: 100%;
  min-width: 60px;
  max-width: 250px;
}
.th {
  width: 250px;
  flex-shrink: 0;
}
.logo {
  line-height: 56px;
}
.logo img {
  margin-right: 10px;
  width: 34px;
  height: 34px;
}
.title {
  color: #fff;
}
.menu {
  z-index: 200;
}
</style>
