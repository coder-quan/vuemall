<template >
  <div class="error">
    <span class="tip">肥肠抱歉，你要找的页面不见了</span>
    <span @click="backhome" class="back">返回上一页</span>
  </div>
</template >

<script >
  export default {
    name: "error",
    methods: {
      backhome() {
        this.$router.go(-1)
      }
    }
  }
</script >

<style scoped >
  .error {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    line-height: 100vh;
    text-align: center;
    z-index: 1000;
  }
  .error .back {
    font-size: 12px;
    height: 6vh;
    line-height: 6vh;
    position: fixed;
    top: 70vh;
    bottom: 20vh;
    left: 35vw;
    right: 35vw;
    background-color: var(--color-tint);
    border-radius: 5vh;
    color: #fff;
  }
</style >