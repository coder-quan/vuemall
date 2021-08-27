<template>
  <div id="app">
      <keep-alive exclude="Detail">
        <!--    显示内容-->
        <router-view></router-view>
      </keep-alive>
      <!--    底部tab栏-->
      <main-tab-bar></main-tab-bar>
  </div>
</template>
<style>
/*第一种写法*/
@import "assets/css/base.css";
/*第二种写法*/
/*@import "~@/assets/css/base.css";*/
</style>
<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name:"App",
  components: {
    MainTabBar
  }
}
</script>