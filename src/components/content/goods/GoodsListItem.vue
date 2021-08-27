<template>
  <div class="goods-item" @click="itemClick">
    <img :src="itemImg" alt="">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <div class="goods-detail">
        <div class="goods-price">
          <span class="price">{{'￥'+goodsItem.price}}</span>
        </div>
        <div class="goods-collect">
          <span class="collect">{{goodsItem.cfav}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueRouter from 'vue-router'
  const { isNavigationFailure, NavigationFailureType } = VueRouter
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default: {}
      }
    },
    computed: {
      itemImg() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      itemClick() {
        if(this.goodsItem.iid){
          this.$router.push('/detail/' + this.goodsItem.iid )
        }
        else {
          this.$router.push('/error')
        }
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    width: 100%;
    display: inline-block;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 1px 1px 4px #000;
  }

  .goods-item img{
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .goods-info {
    font-size: 14px;
    text-align: center;
  }

  p {
    width: 100%;
    height: 26px;
    line-height: 26px;
    overflow: hidden;
    padding: 0 5px;
  }

  .goods-detail {
    position: relative;
    padding-bottom: 25px;
  }

  .goods-price {
    position: absolute;
    float: left;
    left: 5px;
  }

  .price {
    color: var(--color-high-text);
  }

  .goods-collect {
    position: absolute;
    float: right;
    right: 5px;
  }

  .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 1px;
    width: 14px;
    height: 14px;
    background: url("~common/collect.svg") 0 0 / 14px 14px;
  }
</style>
