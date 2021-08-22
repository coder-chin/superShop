<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @itemClick="tabClick">
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
  data() {
    return {
      banners: [],
      recommends: [],
      currentType: POP,
      goodsList: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] },
      },
      isShowBackToTop: false,
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
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
    },
    contentScroll(position) {
      this.isShowBackToTop = -position.y > 1000;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    // 网络请求相关
    getMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data[BANNER].list;
        this.recommends = res.data[RECOMMEND].list;
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
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 999;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>