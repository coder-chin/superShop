<template>
  <div>
    <cart-list-item v-for="item in cartList" :key="item.iid" :item-info='item'/>
  </div>
    
</template>

<script>
  import CartListItem from './CartListItem'

  export default {
    name: 'CartList',
    props: {
      cartList: {
        type: Array,
        default: () => { return [] }
      }
    },
    components: {
      CartListItem
    },
  }
</script>

<style scoped>
</style>