<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <div class="privateImage-svg left">
        <img src="~profile/avatar.svg" alt="">
      </div>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <img src="~profile/phone.svg" alt="">
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <img src="~common/back.svg" alt="">
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
    overflow: hidden;
  }
  .privateImage-svg img {
    width: 60px;
    height: 60px;
    padding-top: 10px;
  }
  .left {
    float: left;
  }

  .clear-fix>img {
    position: fixed;
    right: 20px;
    top: 73px;
    width: 15px;
    height: 15px;
    transform: rotate(180deg);
    z-index: 10000;
  }

  .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  .phone {
    position: relative;
    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  .phone img{
    position: absolute;
    width: 20px;
    height: 30px;
    left: -18px;
    top: -6px;
  }
</style>
