<template>
  <div id="detail">
    <detail-nav-bar @itemClick='titleClick' :current-index='currentIndex'></detail-nav-bar>
    <scroll class="content"
      ref="scroll"
      @scroll="contentScroll"
      :detail="[topImages, goods, shop, detailInfo, paramInfo, commentInfo, recommendList]"
      :probe-type="3" :pull-up-load='true'>
        <detail-swiper ref='base' :imageList='topImages'/>
        <detail-base-info :goods='goods'/>
        <detail-shop-info :shop='shop'/>
        <detail-goods-info :detailInfo='detailInfo'/>
        <detail-param-info ref='param' :paramInfo='paramInfo'/> 
        <detail-comment-info ref='comment' :commentInfo='commentInfo'/>
        <detail-recommend-info ref='recommend' :recommendList='recommendList'/>
    </scroll>
    <back-to-top v-show="showBackTop" class="back-to-top" @click.native="toTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-to-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
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
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import BackToTop from 'components/common/backToTop/BackToTop'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  import {backTopMixin} from 'common/mixin'

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
      DetailRecommendInfo,
      BackToTop,
      DetailBottomBar
    },
    mixins: [backTopMixin],
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
        recommendList: [],
        themeTops: [],
      }
    },
    created() {
      this.id = this.$route.query.id
      this.getDetailData()
      this.getRecommendData()
    },
    //拿到值以后还需要渲染
    updated() {
		  // 数据变化时获取需要的四个offsetTop
      this._getOffsetTops()
    },
    methods: {
      //获取offsetTop
      _getOffsetTops() {
		    this.themeTops = []  //每次都置空
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      titleClick(index) {
        console.log(index);
        this.currentIndex = index
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 200)
      },
      contentScroll(position) {
        this.showBackTop = position.y < -1000
        this._listenScrollTheme(-position.y)
      },
      _listenScrollTheme(position) {
        let length = this.themeTops.length;
        for (let i = 0; i < length; i++) {
          let iPos = this.themeTops[i];
          if (position >= iPos && position < this.themeTops[i+1]) {
            if (this.currentIndex !== i) {
              this.currentIndex = i;
            }
            break;
          }
        }
      },
      addToCart() {
        const product = {}
        product.iid = this.iid
        product.imgURL = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.newPrice = this.goods.nowPrice
        this.$store.dispatch('addCart', product)
      },

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
    height: calc(100% - 102px);
  }
  .back-to-top{
    position: fixed;
    bottom: 65px;
    right: 10px;
  }
</style>