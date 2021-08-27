<template >
  <div class="tab-view">
    <div class="tab-view-all">
      <div class="tab-view-list">
        <div class="tab-view-item" v-for="(item, index) in classification.list" :key="index">
          <a :href="item.link">
            <img class="item-img" :src="item.image" alt="">
            <div class="item-text">{{item.title}}</div>
          </a>
        </div>
      </div>
      <tab-control class="category-tab"
                   :titles="['综合', '新品', '销量']"
                   @tabClick="tabClick"/>
      <goods-list class="category-goods"
                  :goods="showCategoryDetail"
                  :currentType="currentType"
                  :vacate="false"/>
    </div>
  </div>
</template >

<script >
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  export default {
    name: "TabView",
    components: {
      TabControl,
      GoodsList
    },
    props: {
      classification: {
        type: Object,
        default() {
          return {}
        }
      },
      showCategoryDetail: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        currentType: 'pop'
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$emit('tabClick', this.currentType)
      }
    }
  }
</script >

<style scoped >
  .tab-view {
    width: calc(100vw - 80px);
    height: 100%;
    overflow: hidden;
    float: right;
  }
  .tab-view-all {
    width: calc(100% + 8px);
    height: 100%;
    overflow-y: scroll;
  }
  .tab-view-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-left: 4%;
    padding-right: calc(4% + 8px);
    padding-bottom: 5px;
  }
  .tab-view-item {
    width: 30%;
    padding-top: 10px;
  }
  .item-img {
    width: 100%;
  }
  .item-text {
    width: 100%;
    line-height: 15px;
    font-size: 12px;
    text-align: center;
  }
  .category-tab {
    top: 0;
    position: relative;
  }
  .category-goods {
    margin-bottom: -49px;
    width: calc(100% - 8px);
  }
</style >