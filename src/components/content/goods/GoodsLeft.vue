<template >
  <div class="goods-left"
       :class="{isAdd: vacate === true}">
    <div class="goods-left-items"
         v-for="(item, id) in Goods"
         :key="id">
      <goods-list-item :goods-item="item" />
    </div>
  </div>
</template >

<script >
  import GoodsListItem from './GoodsListItem'
  export default {
    name: "GoodsLeft",
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
          if(id % 2 !== 0) {
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
  .goods-left {
    /*左浮动，将左商品栏固定在左边*/
    float: left;
    /*宽度为屏幕的50%*/
    width: 50%;
  }
  .goods-left-items {
    padding: 1vw 2% 1vw 4%;
  }
  .isAdd {
    padding-bottom: 49px;
  }
</style >