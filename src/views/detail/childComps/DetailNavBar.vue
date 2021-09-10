<template>
  <div>
    <nav-bar class="detail-nav">
      <img src="~assets/img/common/back.svg" slot='left' class="back" @click="backToIndex">
      <div slot='center' class="title">
        <span class="title-item"
        v-for="(item, index) in titleInfos"
        :key="index"
        :class="{'title-item-active': index===currentIndex}"
        @click="itemClick(index)">{{item}}
        </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar,
    },
    props: {
      titleInfos: {
        type: Array,
        default: () => {
          return ['商品', '参数', '评论', '推荐']
        }
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      backToIndex() {
        this.$router.back()
      },
      itemClick(index) {
        this.$emit('itemClick', index)
      }
    }
  }
</script>

<style scoped>
  .detail-nav{
    background-color: #fff;
    position: relative;
    z-index: 99;
  }
  .back{
    margin-top: 12px;
  }
  .title{
    display: flex;
    padding: 0 20px;
    font-size: 14px;
  }
  .title-item{
    flex: 1;
  }
  .title-item-active{
    color: var(--color-high-text);
  }
</style>