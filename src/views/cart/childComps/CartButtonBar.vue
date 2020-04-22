<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div>
      合计:{{totalPrice}}
    </div>
    <div class="calculate">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "CartButtonBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)

      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // return !(this.$store.state.cartList.filter(item => !item.checked).length)
        //里面没有商品
        if (this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked) //全选为true不全选为false
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {  //全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else {  //部分或全部不选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
    }

  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .bottom-bar div:nth-child(2) {
    margin-left: 40px;
    height: 100%;
    line-height: 40px;
  }

  .bottom-bar div:last-child {
    margin-left: 30px;
    height: 100%;
    line-height: 40px;
    background-color: var(--color-tint);
    padding: 0 5px;
  }

  .check-content {
    display: flex;
    line-height: 40px;
    align-items: center;
    margin-left: 10px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
</style>
