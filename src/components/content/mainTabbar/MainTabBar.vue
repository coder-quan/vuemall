<template >
  <tab-bar>
    <!--    可以通过active-color修改导航栏文字的颜色-->
    <tab-bar-item path="/home" active-color="red">
      <template #item-icon>
        <img src="~tabbar/home.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~tabbar/home_active.svg" alt="">
      </template>
      <template #item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template #item-icon>
        <img src="~tabbar/category.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~tabbar/category_active.svg" alt="">
      </template>
      <template #item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template #item-icon>
        <img src="~tabbar/shopcart.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~tabbar/shopcart_active.svg" alt="">
      </template>
      <template #item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template #item-icon>
        <img src="~tabbar/profile.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~tabbar/profile_active.svg" alt="">
      </template>
      <template #item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template >

<script >
  // 第一种写法
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from "components/common/tabbar/TabBarItem";
  // 第二种写法
  // import TabBar from '@/components/tabbar/TabBar'
  // import TabBarItem from "@/components/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script >

<style scoped >

</style >