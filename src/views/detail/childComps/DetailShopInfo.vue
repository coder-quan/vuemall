<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo">
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score | scoreFilter}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailShopInfo",
    props: {
		  shop: {
		    type: Object,
        default: {}
      }
    },
    filters: {
		  // 过滤器，将普通数字转换成万，保留一位小数
      sellCountFilter(value) {
        if (value < 10000) return value
        if (!value) return 0
        return (value/10000).toFixed(1) + '万'
      },
      scoreFilter(value) {
        return value.toFixed(2)
      }
    }
	}
</script>

<style scoped>
  .shop-info {
    background-color: #fff;
    border-bottom: 5px solid #f2f5f8;
    padding: 25px 10px;
  }

  .shop-top {
    display: flex;
    align-items: center;
  }

  .shop-top img {
    border-radius: 50%;
    width: 12vw;
    height: 12vw;
  }

  .shop-top .title {
    display: inline-block;
    position: relative;
    height: 12vw;
    line-height: 12vw;
    padding-left: 10px;
  }

  .shop-middle {
    padding: 10px;
    margin-top: 15px;
    display: flex;
    align-items: center;
  }

  .shop-middle-left, .shop-middle-right {
    flex: 1;
  }

  .shop-middle-left {
    display: flex;
    justify-content: space-around;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }

  .sells-count, .goods-count {
    font-size: 18px;
  }

  .sells-text, .goods-text {
    margin-top: 10px;
    font-size: 12px;
  }
  .shop-middle-right {
      font-size: 13px;
      color: #333;
  }

  .shop-middle-right table {
    width: 120px;
    margin-left: 30px;
  }

  .shop-middle-right table td {
    padding: 5px 0;
  }

  .shop-middle-right .score {
    color: #5ea732;
  }

  .shop-middle-right .score-better {
    color: #f13e3a;
  }

  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }

  .shop-middle-right .better-more span {
    background-color: #f13e3a;
  }

  .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    display: inline-block;
    font-size: 14px;
    background-color: #f2f5f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>
