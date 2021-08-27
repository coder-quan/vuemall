<template>
  <!--  通过 key attribute 设置唯一的值来标记以让 Vue 区分不同的列表-->
  <!--  防止切换标签时只更换内容-->
  <div class="goods" :key="currentType">
    <goods-left :vacate="vacate" :goods="goods"/>
    <goods-right :vacate="vacate" :goods="goods"/>
  </div>
</template>

<script>
  // import GoodsListItem from './GoodsListItem'
  import GoodsLeft from './GoodsLeft'
  import GoodsRight from './GoodsRight'

  export default {
    name: "GoodsList",
    components: {
      // GoodsListItem,
      GoodsLeft,
      GoodsRight
    },
    props: {
      goods: {
        type: Array,
        default: []
      },
      currentType: {
        type: String,
        default: 'pop'
      },
      vacate: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .goods {
    width: 100%;
  }
</style>
