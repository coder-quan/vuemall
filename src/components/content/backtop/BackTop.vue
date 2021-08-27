<template >
  <div class="back-top" @click="toBackTop">
    <img src = "~common/top.png" alt = "" >
  </div>
</template >

<script >
  export default {
    // 此组件默认显示，速度为30，可在父组件使用v-if/v-show选择隐藏组件，使用动态绑定传入速度的值
    name: "BackTop",
    props: {
      // 回到顶部动画速度，默认大概为300ms，设置的值为动画速度的十分之一
      // 取值范围建议在0-50，此范围内动画会比较流畅
      animDuration: {
        type: Number,
        default: 30
      }
    },
    methods: {
      toBackTop(){
        let scrollTop = setInterval(() => {
          // document.documentElement.scrollTop 返回文档的滚动top方向的距离
          let top = document.documentElement.scrollTop
          let speed = top / 10
          if(document.documentElement.scrollTop !== 0) {
            document.documentElement.scrollTop -= speed
          }
          else {
            clearInterval(scrollTop)
          }
        }, this.animDuration)
      }
    }
  }
</script >

<style scoped >
  .back-top {
    position: fixed;
    bottom: 57px;
    right: 7px;
    z-index: 999;
  }
  .back-top img {
    width: 60px;
    height: 60px;
  }
</style >