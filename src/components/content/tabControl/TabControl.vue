<template >
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template >

<script >
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default: []
      }
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick (index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script >

<style scoped >
  .tab-control {
    display: flex;
    text-align: center;
    position: sticky;
    top: 44px;
    background-color: #fff;
    font-size: 15px;
    height: 44px;
    line-height: 44px;
    z-index: 999;
  }
  .tab-control-item {
    flex: 1;
    box-shadow: 0 0 4px rgba(0, 0, 0, .15);
  }
  .tab-control-item span {
    padding: 5px 10px;
  }
  .active {
    color: var(--color-high-text);
  }
  /*渲染span的下边框而非div的下边框（div的下边框比较长，因为div的width比较大）*/
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style >