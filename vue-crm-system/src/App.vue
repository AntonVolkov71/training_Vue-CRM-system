<template>
  <div id="app">
    <component v-bind:is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import LoadingLayout from "@/layouts/LoadingLayout.vue";

export default {
  computed: {
    layout() {
      const { layout = "loading" } = this.$route.meta;
      return `${layout}-layout`;
    },
  },
  components: {
    EmptyLayout,
    MainLayout,
    LoadingLayout,
  },
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "./assets/index.css";
</style>
