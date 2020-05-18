<template>
  <div class="flex home">
    <transition name="zuo">
      <Menu></Menu>
    </transition>
    <Nav></Nav>
  </div>
</template>
<script>
import Menu from "@/components/home/Menu";
import Nav from "@/components/home/Nav";
export default {
  components: {
    Menu,
    Nav
  }
};
</script>
<style scoped>
.home {
  height: 100%;
  width: 100%;
}
.zuo-enter-active,
.zuo-leave-active {
  transition: all 0.3s;
  width: 250px;
}
.zuo-enter,
.zuo-leave-to {
  width: 60px;
}
</style>
