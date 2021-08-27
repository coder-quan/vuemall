<template >
  <div id="detail-swiper">
    <swiper v-if="images.length" class="detail-swiper">
      <swiper-item class="item" v-for="(item, id) in images" :key="id">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template >

<script >
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      images: {
        type: Array,
        default: []
      }
    }
  }
</script >

<style scoped >
  .item {
    overflow: hidden;
    height: 300px;
  }
</style >