<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <scroll :pull-up-load='true' class="content" ref="scroll">
      <cart-list class="cart-list" :cart-list='cartList'></cart-list>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import BottomBar from './childComps/BottomBar.vue'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      Scroll,
      BottomBar,
    },
    computed: {
      cartCount() {
        return this.$store.getters.cartCount
      },
      cartList() {
        return this.$store.getters.cartList
      }
    },
    activated() {
        this.$refs.scroll.refresh()
    }
  };
</script>

<style scoped>
  #cart {
    height: calc(100vh - 49px);
  }
  .nav-bar {
    /* 导航栏背景颜色 */
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 999;   
    /* 不开启定位层级无效！！ */
  }
  .content {
    height: calc(100% - 88px);
    width: 100%;
  }
</style>