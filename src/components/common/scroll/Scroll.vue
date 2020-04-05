<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
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
      //1.创建BScroll对象
      const options={
        click: true, tap: true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpLoad
      }
      this.scroll = new BScroll(this.$refs.wrapper,options

      )
      //2.监听滚动的区域
      this.scroll.on('scroll',(position)=>{
         this.$emit('scroll',position)
      })
      //监听上拉事件
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    },
    methods:{
      scrollTo(x,y,time){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
