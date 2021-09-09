<template>
  <div id="detail">
    <detail-nav-bar @itemClick='titleClick' :current-index='currentIndex'></detail-nav-bar>
    <!-- <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :data="[topImages, goods, shop, detailInfo, paramInfo, commentInfo, recommendList]"
            :probe-type='3'>
        <div>

        </div>
    </scroll> -->
    <detail-swiper
    :imageList='topImages'>
    </detail-swiper>
    <detail-base-info
    :goods='goods'>
    </detail-base-info>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      Scroll,
      DetailSwiper,
      DetailBaseInfo
    },
    data() {
      return {
        id: null,
        currentIndex: 0,
        topImages: [],
        goods: {}
      }
    },
    activated() {
      this.id = this.$route.query.id
      getDetail(this.id).then( res => {
        console.log(res)
        let data = res.result
        this.topImages = data.itemInfo.topImages
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        this.detailInfo = data.detailInfo
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
      })
      getRecommend().then((res, error) => {
          if (error) return
          this.recommendList = res.data.list
        })
    },
    methods: {
      titleClick(index) {
        console.log(index);
      },
      contentScroll(position) {
        this.showBackTop = position < -1000
        this._listenScrollTheme(-position.y)
      }
    }
  }
</script>

<style scoped>
  .detail{

  }
</style>