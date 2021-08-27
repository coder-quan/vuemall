<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div class = "service" >
        <img src = "~detail/service.svg" alt = "">
        <span class="text">客服</span>
      </div>
      <div class = "shop" >
        <img src = "~detail/shop.svg" alt = "" >
        <span class="text">店铺</span>
      </div>
      <div class = "select">
        <img src = "~detail/select.svg" alt = "" >
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <span class="cart" @click="addToCart">加入购物车</span>
      <span class="buy">购买</span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addToCart')
      }
    }
	}
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    width: 100%;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    text-align: center;
    display: flex;
    z-index: 100000;
  }
  .bar-item {
    flex: 1;
    display: flex;
  }
  .service, .shop, .select {
    flex: 1;
  }
  img {
    width: 24px;
    height: 24px;
    margin: 3px auto 2px;
    display: block;
  }
  .text {
    font-size: 14px;
  }
  .cart, .buy {
    flex: 1;
    line-height: 39px;
    font-size: 14px;
    color: #ffffff;
  }
  .bar-right {
    margin: 5px 10px;
  }
  .cart {
    background-color: orange;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .buy {
    background-color: #d35400;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
</style>
