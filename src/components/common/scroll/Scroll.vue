<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  //按需导入
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  // import BScroll from 'better-scroll'
  // 注册插件
  BScroll.use(Pullup)

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      detail: {
        type: Array,
        default: () => { return []}
      },
      goods: {
        type: Array,
        default() {
          return []
        }
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      setTimeout(this.__initScroll, 20)
    },
    methods: {
      //初始化Scroll对象
      __initScroll() {
        //1. 创建Bscroll对象
        if(!this.$refs.wrapper) return
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })
        console.log(this.scroll);
        //2. 监听滚轮位置
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
          //setTimeout(this.refresh, 500)
        })
        //3. 监听上拉事件
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      },
      refresh() {
        this.scroll && this.scroll.refresh && this.scroll.refresh()
      },
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
    },
    watch: {
      goods() {
        setTimeout(this.refresh, 20)
      },
      detail() {
        setTimeout(this.refresh, 20)
      },
    }
  }
</script>

<style scoped>
  .content{
    background-color: #fff;
  }
</style>