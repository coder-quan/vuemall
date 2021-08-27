<template>
  <div id="home" @scroll="isShow">
    <nav-bar class="home-nav">
      <template #center>蘑菇街</template>
    </nav-bar>
    <div ref="minor-view">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
    </div>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"/>
    <goods-list :goods="showGoods" :currentType="currentType"/>
    <load :isLoad="goods[this.currentType].isLoad" :isEnd="goods[this.currentType].isEnd"/>
    <back-top v-show="isActive" :animDuration="20"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Load from 'components/common/load/Load'
  import BackTop from 'components/content/backtop/BackTop'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {getHomeMultidata, getHomeGoods} from 'network/home'

  const velement = document.documentElement

  export default {
    name: "Home",
    components: {
      BackTop,
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Load
    },

    data(){
      return {
        // 轮播图
        banners: [],
        recommends: [],
        // 首页商品信息（页码+数据列表）
        goods: {
          'pop': {page: 0, location: 0, isLoad: false, isEnd: false, list: []},
          'new': {page: 0, location: 0, isLoad: false, isEnd: false, list: []},
          'sell': {page: 0, location: 0, isLoad: false, isEnd: false, list: []},
        },
        // 当前活跃标签
        currentType: 'pop',
        // minor-view标签容器的高度
        allHeight: 0,
        // backtop图标开始显示的位置
        position: 2000,
        // 是否显示backtop图标
        isActive: false,
        // 切换别的页面后拷贝的主页浏览位置的数据
        saveY: {'pop': 0, 'new': 0, 'sell': 0}
      }
    },

    created () {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    // 在生命周期mounted中进行监听滚动
    mounted () {
      window.addEventListener('scroll', this.isShow)
    },

    updated () {
      window.scrollTo(0, this.goods[this.currentType].location)
    },

    // 从别的页面回来切回主页时恢复原来的位置
    activated () {
      for(let key of Object.keys(this.goods)){
        this.goods[key].location = this.saveY[key]
      }
      this.goods.foreach
      window.scrollTo(0, this.goods[this.currentType].location)
    },

    // 保存离开主页时的浏览位置
    deactivated () {
      for(let key of Object.keys(this.goods)){
        this.saveY[key] = this.goods[key].location
      }
    },

    // 在销毁时解绑scroll事件
    destroyed() {
      window.removeEventListener('scroll',this.isShow);
    },

    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    methods: {
      isShow() {
        if(this.allHeight === 0){
          this.check()
        }
        // 当滑动速度过快，显示商品页时来不及将其他标签页设为固定高度（吸顶效果）
        // 则在显示商品页时同时将其他标签页的位置设置为minor-view标签高度的值来保持切换其他标签页时也能吸顶
        if(velement.scrollTop >= this.allHeight){
          for(let [key, value] of Object.entries(this.goods)){
            if(value.location < this.allHeight){
              this.goods[key].location = this.allHeight
            }
          }
          // scrollTop: 代表在有滚动条时，滚动条向下滚动的距离也就是元素顶部被遮住部分的高度。
          this.goods[this.currentType].location = velement.scrollTop
        }
        // 若还能看到minor-view标签，则将其他标签页的位置也设置为当前位置，以保证切换标签页时能保持稳定
        else {
          for(let [key, value] of Object.entries(this.goods)){
            this.goods[key].location = velement.scrollTop
          }
        }
        this.isActive = this.position <= velement.scrollTop
        this.getMoreGoods()
      },

      // 获取minor-view标签页的高度
      check() {
        this.allHeight = this.$refs['minor-view'].scrollHeight
      },

      getMoreGoods(){
        // 防抖
        if(this.goods[this.currentType].isLoad !== true){
          // 可见部分的高度是clientHeight
          // scrollHeight代表包括当前不可见部分的元素的高度。
          if(velement.clientHeight + velement.scrollTop === velement.scrollHeight && velement.scrollHeight !== 0) {
            // 若拉到底部则将加载中显示，并请求商品数据
            // 保存当前申请数据的商品页,直接将this.currentType传入函数会导致将申请的数据写入当前活跃页面
            const type = this.currentType
            this.goods[type].isLoad = true
            // setTimeout(() => this.getHomeGoods(type),10000)
            this.getHomeGoods(this.currentType)
          }
        }
      },

      // 根据当前活跃标签下标转换为对应的商品信息名
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
      },

      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data['banner'].list;
          this.recommends = res.data['recommend'].list;
        })
      },

      // 获取商品列表
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 商品信息全部加载完成
          if(!res){
            this.goods[type].isEnd = true
            this.goods[type].isLoad = false
            setTimeout(() => {
              this.goods[type].isEnd = false
            }, 3000)
          }
          else {
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
            // 加载完成，不显示加载图标
            this.goods[type].isLoad = false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>