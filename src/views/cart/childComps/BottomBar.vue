<template>
  <div class="bottom">
    <check-button class="select-all" @checkBtnClick='checkBtnClick' :isChecked="isCheckedAll"/>
    <span class="total-price">合计: ￥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{$store.getters.cartCount}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton.vue'
  export default {
    name: 'BottomBar',
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        const cartList = this.$store.getters.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.newPrice
        }, 0).toFixed(2)
      },
      //是否选择所有，选择所有的话找不到为false的项
      isCheckedAll() {
        return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
      }
    },
    methods: {
      checkBtnClick() {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);
        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        }
      },
      calcClick() {
        if(!this.isCheckedAll)
        {
          this.$toast.show('请选择要购买的商品')
        }
      }
    }
  }
</script>

<style scoped>
  .bottom{
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }
  .select-all{
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>