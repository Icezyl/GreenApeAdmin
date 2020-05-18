<template>
  <div class="tags-nav">
    <el-row>
      <el-col :span="1">
        <div class="fun" @click="toLeft">
          <i class="el-icon-arrow-left"></i>
        </div>
      </el-col>
      <el-col :span="21" class="parent-dom">
        <vue-scroll ref="vs" :ops="ops">
          <div class="child-dom flex">
            <router-link
              tag="span"
              to="/home"
              :class="{blue:tagsState=='/home'}"
              @click.native="setTagsState('/home')"
            >首页</router-link>
            <router-link
              tag="span"
              :to="item.router"
              :class="{blue:tagsState==item.router}"
              class="tags flex"
              v-for="(item, index) in tagsList"
              :key="item.id"
              @click.native="setTagsState(item.router)"
            >
              {{item.name}}
              <i class="el-icon-close" @click="removeTagsList(index)"></i>
            </router-link>
          </div>
        </vue-scroll>
      </el-col>
      <el-col :span="2" class="flex">
        <div class="fun" @click="toRight">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="close" @mouseover="closeState=true" @mouseout="closeState=false">
          <i class="el-icon-close fun"></i>
          <transition name="upDown">
            <div class="la" v-if="closeState">
              <ul>
                <li @click="removeAllTagsList">关闭所有</li>
                <li @click="removeOnlyTagsList(tagsState)">关闭其他</li>
              </ul>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      closeState: false,
      ops: {
        scrollPanel: {
          scrollingY: false
        },
        bar: {
          background: "#409EFF"
        }
      }
    };
  },
  computed: {
    ...mapState(["tagsList", "tagsState"])
  },
  methods: {
    ...mapMutations([
      "setTagsState",
      "removeTagsList",
      "removeAllTagsList",
      "removeOnlyTagsList"
    ]),
    toLeft() {
      this.$refs["vs"].scrollBy(
        {
          dx: -100
        },
        500
      );
    },
    toRight() {
      this.$refs["vs"].scrollBy(
        {
          dx: 100
        },
        500
      );
    }
  }
};
</script>
<style scoped>
.blue {
  background: #409eff;
  color: #fff;
}
.tags-nav {
  height: 50px;
}
.tags {
  margin-left: 10px;
}
.fun {
  line-height: 30px;
  height: 30px;
  width: 50px;
  text-align: center;
  margin: 10px 0;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
}
.fun:hover {
  background: #fff;
}
span {
  flex-shrink: 0;
  margin: 10px 0;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  padding: 0 15px;
  display: inline-block;
  height: 30px;
  cursor: pointer;
  background: #fff;
  color: #000;
}
.el-row,
.el-col {
  height: 100%;
}
.close {
  position: relative;
}
.close .la {
  position: absolute;
  top: 45px;
  right: 5px;
  width: 90px;
  font-size: 12px;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  padding: 10px 0;
  border-radius: 5px;
  background: #fff;
  z-index: 200;
}
.la ul li {
  cursor: pointer;
  line-height: 24px;
  padding: 0 10px;
}
.la ul li:hover {
  background: #f3f3f0;
}
</style>
