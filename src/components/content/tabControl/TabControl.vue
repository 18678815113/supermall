<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index"
    class="tab-control-item"
    :class="{active:index===currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex=index
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    position: sticky;
    top: 44px;
    background-color: white;
  }
  .tab-control-item{
    flex: 1;
  }
  .active{
    color:var(--color-high-text);
  }
  .active span{
    border-bottom:  3px solid var(--color-high-text);
    padding: 5px;
  }
</style>
