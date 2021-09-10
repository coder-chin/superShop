<template>
  <div id="detail">
    <detail-nav-bar @itemClick='titleClick' :current-index='currentIndex'></detail-nav-bar>
    <scroll class="content"
      :pullUpLoad='true'>
        <!-- <detail-swiper :imageList='topImages'/>
        <detail-base-info :goods='goods'/>
        <detail-shop-info :shop='shop'/>
        <detail-goods-info :detailInfo='detailInfo'/>
        <detail-param-info :paramInfo='paramInfo'/> -->
        <detail-comment-info :commentInfo='commentInfo'/>
    </scroll>
    
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      Scroll,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
    },
    data() {
      return {
        id: null,
        currentIndex: 0,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
      }
    },
    created() {
      this.id = this.$route.query.id
      this.getDetailData()
      this.getRecommendData()
    },
    methods: {
      //获取详情页数据
      getDetailData() {
        getDetail(this.id).then( res => {
          console.log(res)
          let data = res.result
          this.topImages = data.itemInfo.topImages
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          this.shop = new Shop(data.shopInfo)
          this.detailInfo = data.detailInfo
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          if (data.rate.list) {
              this.commentInfo = data.rate.list[0];  //只取一条评论
          }
        })
      },
      getRecommendData() {
        getRecommend().then((res, error) => {
          if (error) return
          this.recommendList = res.data.list
        })
      },
      titleClick(index) {
        console.log(index);
        this.currentIndex = index
      },
      contentScroll(position) {
        this.showBackTop = position < -1000
        this._listenScrollTheme(-position.y)
      }
    }
  }
</script>

<style scoped>
  #detail{
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 99;
  }
  .content{
    background-color: #fff;
    height: calc(100% - 44px);
  }
</style>