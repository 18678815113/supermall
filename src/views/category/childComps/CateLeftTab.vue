<template>
  <div class="CateLeftTab">
    <ul>
      <Scroll class="content">
        <li v-for="(item,index) in leftList" :key="index" :class="{isActive:index===isIndex}" @click="leftClick(index)">
          {{item.title}}
        </li>
      </Scroll>
    </ul>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: "CateLeftTab",
    props: {
      leftList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Scroll
    },
    data() {
      return {
        isIndex: 0
      }
    },
    methods: {
      leftClick(index) {
        this.isIndex = index
        this.$emit('leftclick',index)
      }
    }

  }
</script>

<style scoped>

  ul {

    background-color: rgb(247, 247, 247);
    width: 130px;
  }
  ul .content{
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
  }
  ul li {
    width: 100%;
    padding: 15px 30px;
  }

  .isActive {
    background-color: white;
    color: var(--color-high-text);
    border-left: 5px solid var(--color-high-text);
  }
</style>
