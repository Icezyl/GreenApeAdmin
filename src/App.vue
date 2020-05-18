<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "app",
  mounted() {
    this.getTagsList;
    this.getId
    this.getToken
  },
  watch: {
    "$route.path"(newVal) {
      this.setTagsState(newVal);
    }
  },
  computed: {
    ...mapGetters(["getTagsList", "getId", "getToken"])
  },
  methods: {
    ...mapMutations(["setTagsState"])
  }
};
</script>
