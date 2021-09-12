<template>
  <div id="itemContainer">
    <div class="item-selector">
      <check-button @checkBtnClick="checkedChange" :isChecked="itemInfo.checked"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.imgURL" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">
          <span class="rmb">¥</span> {{itemInfo.newPrice}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  export default {
    name: 'CartListItem',
    components: {
      CheckButton
    },
    props: {
      itemInfo: {
        type: Object,
        default: () => { return {} }
      }
    },
    methods: {
      checkedChange() {
        this.itemInfo.checked = !this.itemInfo.checked
      }
    }
  }
</script>

<style scoped>
  #itemContainer {
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector {
    width: 14%;
    display: flex;
    /* 居中 */
    justify-content: center;
    align-items: center;
  }
  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }
  .item-img img {
    width: 80px;
    height: 100px;
    vertical-align: top;  
    /* 取消缝隙 */
    border-radius: 5px;
  }
  .item-title, .item-desc {
    /* 省略号处理 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin: 15px 0;
  }
  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
  .info-bottom .item-price {
    color: orangered;
    font-weight: bolder;
  }
  .item-price .rmb {
    font-size: 5px;
  }
  .item-count {
    width: 35px;
    text-align: center;
    padding: 3px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
</style>