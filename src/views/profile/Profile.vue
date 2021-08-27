<template>
  <div id="profile">
    <nav-bar class="profile-nav">
      <template #center>蘑菇商城</template>
    </nav-bar>
    <UserInfo></UserInfo>

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <div class="detail">
      <div class="message">
        <img src="~profile/message.svg" alt="">
        <span>我的消息</span>
      </div>
      <div class="shopping">
        <img src="~profile/shopping.svg" alt="">
        <span>积分商城</span>
      </div>
      <div class="vip">
        <img src="~profile/vip.svg" alt="">
        <span>会员卡</span>
      </div>
      <div class="cart" @click="toCart">
        <img src="~profile/cart.svg" alt="">
        <span>我的购物车</span>
      </div>
      <div class="download">
        <img src="~profile/download.svg" alt="">
        <span>下载购物APP</span>
      </div>
    </div>
  </div>
</template>

<script>
  import UserInfo from './childComps/UserInfo'
  import NavBar from 'components/common/navbar/NavBar'

	export default {
		name: "Profile",
    components: {
		  UserInfo, NavBar
    },
    methods: {
		  toCart() {
		    this.$router.replace('/cart')
      }
    }
	}
</script>

<style scoped>
  #profile {
    width: 100vw;
    height: 100vh;
    background-color: #f2f2f2;
  }

  .profile-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .account {
    display: flex;
  }

  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
    color: #666;
    font-size: 13px;
    padding: 18px;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    margin-top: 6px;
  }

  .detail {
    height: calc(100vh - 267px);
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }

  .detail div {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 10px 15px;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, .25);
  }
  .detail div span {
    margin-left: 10px;
  }
  .detail img {
    width: 20px;
    height: 20px;
  }
</style>
