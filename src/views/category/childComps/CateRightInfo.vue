<template>
  <div class="CateRightInfo">
    <scroll class="content">
      <cate-right-info-item :CateGoodsItem="CateInfoItem"/>
    </scroll>
  </div>
</template>

<script>
  import CateRightInfoItem from './CateRightInfoItem'
  import Scroll from 'components/common/scroll/Scroll'
  export default {
    name: "CateRightInfo",
    props: {
      CateInfoItem: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      CateRightInfoItem,
      Scroll
    }
  }
</script>

<style scoped>
  .CateRightInfo,.content {
    height: calc(100vh - 49px - 44px);
    width: calc(100vw - 130px);
    background-color: white;
    overflow: hidden;
  }

</style>
