<template >
  <div class="goods-right"
       :class="{isAdd: vacate === true}">
    <div class="goods-right-item"
         v-for="(item, id) in Goods"
         :key="id">
      <goods-list-item :goods-item="item" />
    </div>
  </div>
</template >

<script >
  import GoodsListItem from './GoodsListItem'
  export default {
    name: "GoodsRight",
    props: {
      goods: {
        type: Array,
        default: []
      },
      vacate: {
        type: Boolean,
        default: true
      }
    },
    components: {
      GoodsListItem
    },
    computed: {
      Goods(){
        const goodsitem = []
        let id = 0
        for(let item of this.goods) {
          if(id % 2 === 0) {
            goodsitem.push(item)
          }
          id++
        }
        return goodsitem
      }
    }
  }
</script >

<style scoped >
  .goods-right {
    /*右商品栏距离左边商品栏屏幕50%的距离*/
    margin-left: 50%;
    /*宽度为屏幕的50%*/
    width: 50%;
  }
  .goods-right-item {
    padding: 1vw 4% 1vw 2%;
  }
  .isAdd {
    padding-bottom: 49px;
  }
</style >