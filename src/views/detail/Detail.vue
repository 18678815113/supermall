<template>
  <div id="detail">
    <detail-nav-bar class="detailBar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-gods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick"
              v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetaillBottomBar'
  import {debounce} from "common/utils";
  import BackTop from 'components/content/backTop/BackTop'
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import GoodsList from 'components/content/goods/GoodsList'

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex:0,
        isShowBackTop:false
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.id
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result
        // 1.获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages
        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.创建店铺信息对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        this.getThemeTopY = debounce(() => {
          this.$nextTick(() => {
            //根据最新的数据，对应的DOM已经是被渲染出来了
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE)
          })
        }, 100)
      })
      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted() {
      //1.图片加载完的时间监听
      const refresh = debounce(this.$refs.scroll.refresh, 200)
      //对监听的事件进行保存
      this.$bus.$on('detailImageload', () => {
        refresh()
      })

    },
    updated() {

    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // 0  13841  15113 15329
        //获取Y值
        const positionY = -position.y
        let length = this.themeTopYs.length
        for (let i = 0; i < length-1; i++) {
          // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          //
          // }
        //  if (this.currentIndex!==i&&((i < length - 1 && positionY >=this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY > this.themeTopYs[i]))) {
          if (this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])) {
            //console.log(i)
            this.currentIndex=i
            console.log(this.currentIndex)
            this.$refs.nav.currentIndex=this.currentIndex
          }
          // 是否显示回到顶部
          //1.判断BackTop是否显示
          this.isShowBackTop = (-position.y) > 1000
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0,300)
      },
      addToCart(){
        //1.获取商品信息
        console.log("11111")
        const  product={}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice
        product.iid=this.iid
        //2将商品信息添加到购物车里
        //this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100vh - 44px - 49px);
  }
</style>
