<template>
  <swiper>
    <swiper-item v-for="(item, id) in banners" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  import Bus from 'components/common/swiper/Bus'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default: []
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    updated () {
      // 在banners更新也就是图片加载时触发此事件，通过事件总线传给swiper组件
      Bus.$emit("loadAll", true)
    }
  }
</script>

<style scoped>

</style>
