<!-- 每个分页的导航栏-->
<template >
  <div class="nav-bar">
    <!-- 导航栏分为三个具名插槽，方便组件复用-->
    <div class="left">
      <slot name="left"></slot>
    </div>

    <div class="center">
      <slot name="center"></slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>

  </div>
</template >

<script >
  export default {
    name: "NavBar",
  }
</script >

<style scoped >
  .nav-bar {
    display: flex;
    height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
    /*粘性定位，使导航栏固定在顶部*/
    position: sticky;
    top: 0;

    /*防止导航栏被轮播图覆盖*/
    z-index: 999;
  }
  .left, .right {
    width: 60px;
    /*将导航栏左右两边的图标各自上下垂直居中*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center {
    flex: 1;
    line-height: 44px;
  }
</style >