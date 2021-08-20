<template>
  <div class="feature">
    <div class="feature-item" v-for="(item, index) in features" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  props: {
    features: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.feature {
  display: flex;
  padding: 10px;
  font-size: 14px;
  border-bottom: 10px solid #eee;
  text-align: center;
}

.feature-item {
  flex: 1;
}

.feature-item img {
  width: 80px;
  height: 80px;
  margin-bottom: 2px;
}
</style>