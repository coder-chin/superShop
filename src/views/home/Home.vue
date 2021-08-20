<template>
  <div>
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners='banners'></home-swiper>
    <feature-view :features="recommends"></feature-view>
    <recommend-view></recommend-view>
    <tab-control :titles="['流行', '新款', '精选']"
                  @itemClick='tabClick'>
    </tab-control>
    <goods-list :goods-list='showGoodsList'></goods-list>
  </div>
</template>
  
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'

  import HomeSwiper from './childComps/HomeSwiper'
  import FeatureView from './childComps/FeatureView'
  import RecommendView from './childComps/RecommendView'
  import goodsList from './childComps/GoodsList'

  import {getHomeMultidata, getHomeData, RECOMMEND, BANNER} from 'network/home'
  import {NEW, POP, SELL, BACKTOP_DISTANCE} from 'common/const'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      FeatureView,
      RecommendView,
      TabControl,
      goodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        currentType: POP,
        goodsList: {
          'pop': {page: 1, list: []},
          'new': {page: 1, list: []},
          'sell': {page: 1, list: []}
        },
      }
    },
    computed: {
      showGoodsList() {
        return this.goodsList[this.currentType].list
      }
    },
    created() {
      //请求轮播图、推荐数据
      this.getMultidata()

      //请求流行、新款、精选数据
      this.getHomeProducts(POP)
      this.getHomeProducts(NEW)
      this.getHomeProducts(SELL)
    },
    methods: {
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
      },

      // 网络请求相关
      getMultidata() {
        getHomeMultidata().then( res => {
          this.banners = res.data[BANNER].list
          this.recommends = res.data[RECOMMEND].list
        })
      },
      getHomeProducts(type) {
        getHomeData(type, this.goodsList[type].page).then(res => {
          const goodsList = res.data.list
          this.goodsList[type].list.push(...goodsList)
          this.goodsList[type].page += 1
        })
      },
    }
  }
</script>

<style>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>