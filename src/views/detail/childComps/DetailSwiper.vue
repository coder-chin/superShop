<template>
  <swiper v-if="imageList.length">
    <swiper-item class="item" v-for="(item, index) in imageList" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'
  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      imageList: {
        type: Array,
        default: () => { return [] }
      }
    }
  }
</script>

<style scoped>
  .item {
    text-align: center;
    height: 300px;
  }
</style>