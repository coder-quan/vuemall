<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    /*height: 140px;*/
    text-align: center;
    font-size: 12px;

    padding: 10px 0 10px;
    border-bottom: 10px solid #eee;
    background-color: #fff;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 90%;
    height: 70%;
    margin-bottom: 10px;
  }
</style>
