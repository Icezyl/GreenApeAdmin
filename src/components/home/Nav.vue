<template>
  <div class="body" :style="{width:(screenWidth-(teleState?60:252))+'px'}">
    <Header></Header>
    <TagsNav></TagsNav>
    <div class="page">
      <vue-scroll ref="vs" :ops="ops">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </vue-scroll>
    </div>
  </div>
</template>
<script>
import TagsNav from "./min/Tags";
import Header from "./min/Header";
import { mapState } from "vuex";
export default {
  data() {
    return {
      ops: {
        scrollPanel: {
          scrollingX: false
        },
        bar: {
          background: "#409EFF"
        }
      },
      screenWidth: document.body.clientWidth
    };
  },
  computed: {
    ...mapState(["teleState"])
  },
  components: {
    TagsNav,
    Header
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          console.log(that.screenWidth);
          that.init();
          that.timer = false;
        }, 400);
      }
    }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
  }
};
</script>
<style scoped>
.body {
  min-width: 800px;
  widows: 100%;
  flex-shrink: 0;
}
.page {
  height: 85%;
  border-radius: 5px;
  margin: 0 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
  transform: translateX(0);
}
.fade-enter,
.fade-leave-to {
  transition: all 0s;
  opacity: 0;
  transform: translateX(-5%);
}
</style>
