<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style scoped>
  #tab-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
    height: 49px;
    box-shadow: 0 -1px 1px rgba(150, 150, 150, .08);
    display: flex;
  }
</style>