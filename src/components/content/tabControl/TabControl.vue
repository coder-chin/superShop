<template>
  <div>
    <div class="tab-control">
      <div class="tab-control-item"
          v-for="(item,index) in titles"
          :key="index"
          :class="{active: index === currentIndex}"
          @click="itemClick(index)">
        <span>{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        //触发事件
        this.$emit('itemClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
  }

  .tab-control-item{
    flex: 1;
    text-align: center;
  }

  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }

  .active span{
    border-bottom: 2px solid var(--color-high-text);
  }
</style>