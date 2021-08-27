<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <template #center>购物车({{ cartCount }})</template>
    </nav-bar>
    <div class="outer-content">
      <div class="inner-content">
        <div class="tip" v-if="judgment">
          <img src="~assets/img/cart/cate.png" alt="">
          <p>你的购物车空空如也</p>
          <div class="cart-text" @click="toHome">去逛逛</div>
        </div>
        <cart-list-item v-for="item in cartList" :key="item.id" :item-info="item"/>
      </div>
    </div>
    <cart-tabbar />
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartListItem from './childComps/CartListItem'
  import CheckButton from './childComps/CheckButton'
  import CartTabbar from './childComps/CartTabbar'
  export default {
    name: "Cart",
    components: {
      CartTabbar,
      NavBar,
      CartListItem,
      CheckButton
    },
    computed: {
      cartList() {
        return this.$store.getters.cartList
      },
      cartCount() {
        return this.$store.getters.cartCount
      },
      judgment() {
        return this.cartList.toString() === ''
      }
    },
    methods: {
      toHome() {
        this.$router.replace('/home')
      }
    }
  }
</script>

<style scoped>
.outer-content {
  width: 100%;
  height: calc(100vh - 137px);
  overflow: hidden;
}
  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .inner-content {
    width: calc(100% + 8px);
    height: calc(100vh - 137px);
    margin-bottom: 93px;
    overflow: hidden;
    overflow-y: scroll;
    background-color: #fff;
  }
  .tip img {
    width: 100%;
    padding-top: 100px;
  }
  .tip p {
    text-align: center;
    font-size: 12px;
    margin-top: -50px;
    margin-bottom: 10px;
  }
  .cart-text {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: var(--color-high-text);
    color: #fff;
    border: 1px solid rgba(0, 0, 0, .35);
    border-radius: 10px;
    margin: auto;
    z-index: 999;
  }
</style>
