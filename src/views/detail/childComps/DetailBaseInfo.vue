<template >
  <div  v-if="Object.keys(goods).length !== 0" id="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <!--使用动态类名，防止goods.discount为空时显示不必要的样式-->
      <span :class="{discount: goods.discount}">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template >

<script >
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    }
  }
</script >

<style scoped >
  #base-info {
    background-color: #fff;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    padding: 10px 7px 5px 7px;
  }
  .n-price {
    font-size: 22px;
    color: var(--color-high-text);
    padding-left: 10px;
  }
  .o-price {
    color: #999;
    text-decoration: line-through;
    padding-left: 5px;
  }
  .discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;

    /*让元素上浮*/
    position: relative;
    top: -8px;
    left: 5px;
  }
  .info-other {
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: space-between;
    padding: 25px 5px 10px 5px;
  }
  .info-service {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, .15);
    padding: 20px 5px;
  }
  .info-service-item img {
    width: 15px;
    height: 15px;
    position: relative;
    top: 3px;
  }
  .info-service-item span {
    font-size: 12px;
  }
</style >