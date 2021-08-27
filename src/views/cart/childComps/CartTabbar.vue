<template >
  <div class="cart-tabbar">
    <div class="cart-select">
      <check-button class="select-all" @checkBtnClick="checkBtnClick" v-model="isSelectAll"></check-button>
      <span class="select-text">全选</span>
    </div>
    <div class="cart-sum">
      <span v-if="$store.getters.selectShop">已选{{ $store.getters.selectShop }}件，</span>
      <span>合计:</span>
      <span>￥{{ totalPrice }}</span>
    </div>
    <div class="cart-submit">
      <button>结算</button>
    </div>
  </div>
</template >

<script >
import CheckButton from './CheckButton'
export default {
  name: "CartTabbar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      const cartList = this.$store.getters.cartList;
      return cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count * item.newPrice
      }, 0).toFixed(2)
    },
    isSelectAll: function () {
      return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
    }
  },
  methods: {
    checkBtnClick: function () {
      // 1.判断是否有未选中的按钮
      let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

      // 2.有未选中的内容, 则全部选中
      if (isSelectAll) {
        this.$store.state.cartList.forEach(item => {
          item.checked = true;
        });
      } else {
        this.$store.state.cartList.forEach(item => {
          item.checked = false;
        });
      }
    }
  }
}
</script >

<style scoped >
  .cart-tabbar {
    display: flex;
    height: 44px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, .4);
    background-color: #fff;
  }
  .cart-select {
    flex: 2;
    display: flex;
    padding-top: 10px;
    padding-left: 10px;
  }
  .select-all {
    padding-right: 5px;
  }
  .select-text {
    padding-top: 3px;
    font-size: 12px;
  }
  .cart-sum {
    flex: 4;
  }
  .cart-sum span:first-child, .cart-sum span:nth-child(2){
    font-size: 12px;
    position: relative;
    top: 10px;
  }
  .cart-sum span:last-child {
    font-size: 15px;
    float: right;
    position: relative;
    top: 12px;
    right: 5px;
    color: darkorange;
  }
  .cart-submit {
    flex: 2;
  }
  .cart-submit button {
    width: 90%;
    height: 30px;
    font-size: 15px;
    color: #fff;
    background-color: darkorange;
    border: none;
    border-radius: 15px;
    margin-top: 7px;
  }
</style >