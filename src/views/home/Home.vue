<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control class="fixed" :titles="['流行', '新款', '精选']"
    @itemClick="tabClick" v-show="isTabFixed" ref="tabcontrol"></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      :probe-type="3"
      :goods='showGoodsList'
      @scroll="contentScroll"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" ref="swiper"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @itemClick="tabClick"
        ref="tabControl">
      </tab-control>
      <goods-list :goods-list="showGoodsList"></goods-list>
    </scroll>
    <back-to-top @click.native="backClick" v-show="isShowBackToTop"/>
  </div>
</template>
  
<script>
import NavBar from "components/common/navbar/NavBar"
import TabControl from "components/content/tabControl/TabControl"
import goodsList from "components/content/goods/GoodsList"
import Scroll from "components/common/scroll/Scroll"
import BackToTop from 'components/common/backToTop/BackToTop'

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeData, RECOMMEND, BANNER } from "network/home";
import { NEW, POP, SELL, BACKTOP_DISTANCE } from "common/const";
import { tabControlMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    FeatureView,
    RecommendView,
    TabControl,
    goodsList,
    Scroll,
    BackToTop
  },
  mixins: [tabControlMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goodsList: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] },
      },
      isShowBackToTop: false,
      isTabFixed: false,
      tabOffsetTop: 0,
      leaveY: 0,
    };
  },
  computed: {
    showGoodsList() {
      return this.goodsList[this.currentType].list;
    },
  },
  created() {
    //请求轮播图、推荐数据
    this.getMultidata();
    //请求流行、新款、精选数据
    this.getHomeProducts(POP);
    this.getHomeProducts(NEW);
    this.getHomeProducts(SELL);
  },
  mounted() {
    // console.log(this.$refs.swiper);
  },
  activated() {
    // this.$refs.swiper.startTimer()  为什么找不到
  },
  deactivated() {
    // this.$refs.swiper.stopTimer()
  },
  methods: {
    contentScroll(position) {
      this.isTabFixed = position.y < -this.tabOffsetTop
      this.isShowBackToTop = -position.y > BACKTOP_DISTANCE;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    // 网络请求相关, 放到最后比较好
    getMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data[BANNER].list;
        this.recommends = res.data[RECOMMEND].list;
        this.$nextTick(() => {
          this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        })
      });
    },
    getHomeProducts(type) {
      getHomeData(type, this.goodsList[type].page).then((res) => {
        const goodsList = res.data.list;
        this.goodsList[type].list.push(...goodsList);
        this.goodsList[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },
    loadMore() {
      this.getHomeProducts(this.currentType)
    },
    //1. vuex状态管理  2. bus总线  
  },
};
</script>

<style scoped>
  #home {
    position: relative;
    height: calc(100vh - 49px);
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 99;
  }
  /* 失效 */
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 999;
  } */
  .content {
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .fixed{
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    z-index: 99;
  }
</style>