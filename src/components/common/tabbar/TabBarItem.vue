<template>
<!--  点击触发事件，跳转到点击的组件对应的路径-->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      // 当前的页面包含当前活跃组件
      // /home -> item1(/home) == true
      // /home -> item2(/category) == false
      // /home -> item3(/shopcart) == false
      // /home -> item4(/profile) == false
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color:this.activeColor} : {}
      }
    },
    methods:{
      itemClick() {
        // push是添加，replace是替换
        // 是否重复跳转路由
        if(this.$route.path !== this.path){
          this.$router.replace(this.path)
        }
      }
    }
  }
</script>
<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>