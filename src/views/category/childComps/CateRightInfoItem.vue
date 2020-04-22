<template>
  <div class="CateRightInfoItem">
    <ul>
      <li v-for="item in CateGoodsItem">
        <img :src="item.image" alt="">
        <span>{{item.title}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "CateRightInfoItem",
    props: {
      CateGoodsItem: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  ul{
    display: flex;
    flex-wrap: wrap;
  }
  li{
    list-style: none;
    width: 120px;
    text-align: center;
  }
  li img{
    width: 100%;
  }
</style>
