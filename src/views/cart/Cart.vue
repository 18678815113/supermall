<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{length}})
      </div>
    </nav-bar>

    <!--商品的列表-->
    <cart-list/>
    <!--底部汇总-->
    <cart-button-bar/>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import CartList from './childComps/CartList'
  import CartButtonBar from './childComps/CartButtonBar'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartButtonBar
    },
    computed: {
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style scoped>

  .nav-bar {
    background-color: var(--color-tint);
    color: white;
  }
</style>
