<template>
  <div id="recommend-info">
    <div class="info-header">热门推荐</div>
    <goods-list :goods="recommendList"></goods-list>
  </div>
</template>

<script>
  // import GridView from 'common/gridView/GridView'
  import GoodsList from 'components/content/goods/GoodsList'

	export default {
		name: "DetailRecommendInfo",
    components: {
		  // GridView,
      GoodsList
    },
    props: {
		  recommendList: {
		    type: Array,
        default: []
      }
    }
	}
</script>

<style scoped>
  .info-header {
    line-height: 40px;
    text-align: center;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
