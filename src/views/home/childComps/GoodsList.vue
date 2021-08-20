<template>
  <grid-view>
    <goods-list-item 
    v-for="(item, index) in goodsList"
    :goods='item' 
    :key="index">
    </goods-list-item>
  </grid-view>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'
  import GoodsListItem from './GoodsListItem'

  export default {
    name: 'GoodsList',
    components: {
      GridView,
      GoodsListItem
    },
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      }
    },
  }
</script>

<style scoped>

</style>