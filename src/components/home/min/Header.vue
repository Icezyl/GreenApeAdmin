<template>
  <div class="header">
    <el-row>
      <el-col :span="1">
        <i
          :class="teleState ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          class="tele"
          @click="setTeleState()"
        ></i>
      </el-col>
      <el-col :span="20">
        <p class="title">
          {{father}} {{home==''? '/': ''}}
          <b>{{home == ''? name : home}}</b>
        </p>
      </el-col>
      <el-col :span="3" class="flex">
        <div class="right" @mouseover="operState=true" @mouseout="operState=false">
          <div class="name">
            {{this.userName}}
            <i class="el-icon-caret-bottom"></i>
          </div>
          <transition name="upDown">
            <div v-if="operState" class="oper">
              <ul>
                <li @click="remove">退出登录</li>
              </ul>
            </div>
          </transition>
        </div>
        <el-avatar class="headerimg" :size="35" src="https://empty" @error="errorHandler">
          <img src="../../../assets/img/header.jpg" />
        </el-avatar>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      operState: false,
      father: "",
      name: "",
      home: "首页"
    };
  },
  computed: {
    ...mapState(["teleState", "tagsState", "tagsList", "id", "userName"])
  },
  watch: {
    $route(to, from) {
      if (to.name == "home") {
        this.home = "首页";
        this.name = "";
        this.father = "";
      } else {
        this.home = "";
      }
      this.te();
    }
  },
  methods: {
    ...mapMutations(["setTeleState", "removeToken", "removeId"]),
    te() {
      console.log(
        this.tagsList.some(({ router, name, father }, index) => {
          if (router === this.tagsState) {
            this.father = father;
            this.name = name;
          }
        })
      );
    },
    errorHandler() {
      return true;
    },
    remove() {
      this.removeToken();
      this.removeId();
      this.$router.go(0);
    },
    sesname() {
      this.$api.postName({ id: this.id }).then(res => {
        console.log(this.id);
        console.log(res);
        if (res.code != 0) {
          this.removeToken();
          this.removeId();
          this.$router.go(0);
          this.$message({
            message: "警告！！！超时请重新登录",
            type: "warning"
          });
        }
      });
    }
  },
  mounted() {
    this.te();
    this.sesname();
  }
};
</script>
<style scoped>
.header {
  background: #fff;
  padding: 0 10px;
}
.el-row,
el-col {
  height: 100%;
}
.el-col-1 {
  margin: 13px 0;
  color: #999;
  height: 26px;
  line-height: 26px;
  font-size: 26px;
}
.tele:hover {
  color: #409eff;
}
.title {
  line-height: 52px;
}
.right {
  position: relative;
}
.right .name {
  flex-shrink: 0;
  line-height: 52px;
  font-size: 14px;
  color: #909ca4;
  cursor: pointer;
}
.headerimg{
  flex-shrink: 0;
}
.oper {
  z-index: 20;
  position: absolute;
  background: 14px;
  background: #fff;
  width: 100px;
  padding: 5px 0;
  border-radius: 5px;
  bottom: -38px;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}
.oper ul li {
  cursor: pointer;
  font-size: 12px;
  padding: 0 10px;
  line-height: 24px;
}
.oper ul li:hover {
  background: #f3f3f0;
}
.el-avatar {
  margin: 7px 2px;
}
</style>
