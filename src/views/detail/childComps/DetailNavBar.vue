<template >
  <nav-bar class="detail-nav">
    <template #left>
      <img src="~common/back.svg" @click="back" alt="">
    </template>
    <template #center>
      <div class="title"
           v-for="(title, index) in titles"
           :class="{active: index === currentIndex}"
           @click="itemClick(index)">
        <span>{{ title }}</span>
      </div>
    </template>
  </nav-bar>
</template >

<script >
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    props: {
      // 活跃位置的下标，'商品'活跃时为0，'参数'活跃时为1
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        titles: ['商品', '评论', '参数', '推荐']
      }
    },
    methods: {
      itemClick (index) {
        this.$emit('tabClick', index)
      },
      back() {
        this.$router.back(1)
      }
    }
  }
</script >

<style scoped >
.detail-nav {
  background-color: #fff;
}
img {
  width: 40%;
  height: 40%;
}
.title {
  display: inline-block;
  padding-left: 5px;
  font-size: 14px;
}
.active {
  color: var(--color-high-text);
}
</style >