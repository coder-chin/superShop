<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tabbar></main-tabbar>
  </div>
</template>

<script>
import mainTabbar from "components/content/mainTabbar/mainTabbar";
export default {
  name: "App",
  components: {
    mainTabbar
  }
};
</script>
<style>
</style>
