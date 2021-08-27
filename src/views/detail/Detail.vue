<template >
  <div id="detail" @scroll="isShow" @touchstart="check">
    <detail-nav-bar :current-index="currentIndex" @tabClick="titleClick"/>
    <div ref="commodity">
      <detail-swiper :images="Image"></detail-swiper>
      <detail-base-info :goods="goods"/>
    </div>
    <div ref="comment">
      <detail-comment-info :comment-info="commentInfo"/>
      <detail-shop-info :shop="shop"/>
    </div>
    <div ref="parameter">
      <detail-param-info :param-info="paramInfo"/>
      <detail-goods-info :detail-info="detailInfo"/>
    </div>
    <div ref="recommend">
      <detail-recommend-info :recommend-list="recommendList"/>
    </div>
    <detail-bottom-bar @addToCart="addToCart"/>
    <div v-if="isAdd" class="add-shop">
      <img src="~assets/img/cart/tick.svg" alt="">
      <span>添加成功，在购物车等亲~</span>
    </div>
    <back-top v-show="isActive" :animDuration="20"/>
  </div>
</template >

<script >
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import BackTop from 'components/content/backtop/BackTop'

  import {getDetail, getRecommend} from 'network/detail'

  import {Goods, GoodsParam, Shop} from './childComps/DetailMethods'

  const velement = document.documentElement
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailCommentInfo,
      DetailParamInfo,
      DetailGoodsInfo,
      DetailRecommendInfo,
      DetailBottomBar,
      BackTop
    },
    data(){
      return {
        // backtop图标是否显示
        isActive: false,
        // 回到顶部图标开始显示的位置
        position: 2000,
        // 商品的id
        id: null,
        // 轮播图片
        Image: [],
        // 商品大概信息
        goods: {},
        // 商家信息
        shop: {},
        // 商品穿着效果图片
        detailInfo: {},
        // 商品参数
        paramInfo: {},
        // 商品评论
        commentInfo: {},
        // 推荐商品
        recommendList: [],
        // 导航栏活跃元素的下标
        currentIndex: 0,
        // 导航栏对应元素的位置
        positions: [0],
        // 导航栏对应元素位置的备份，用来检查是否为准确数值
        copyPositions: [0],
        // 是否已经加载导航栏对应元素的位置
        isCheck: false,
        // 是否添加到购物车
        isAdd: false
      }
    },
    created () {
      // 获取商品详细信息以及推荐信息
      this.id = this.$route.params.id
      this.getMoreGoods()
      this.getRecommend()
    },
    // 在生命周期mounted中进行监听滚动
    mounted () {
      window.addEventListener('scroll', this.isShow)
    },
    destroyed () {
      window.removeEventListener('scroll', this.isShow)
    },
    methods: {
      // 根据点击的标签跳转到对应的位置
      titleClick(index) {
        this.currentIndex = index
        velement.scrollTop = this.positions[index]
      },
      isShow() {
        let index = 0
        let times = 0
        // 根据当前位置显示对应活跃元素
        for(let item of this.positions){
          // 遍历存有位置数据的positions
          if(velement.scrollTop < item && times === 0) {
            // positions共有五个元素，第一个元素始终为0，接下来的元素依次表示【商品，评论，参数，推荐】
            // 四个元素所处的位置，当页面当前位置小于数组某个元素，且某数组元素第一次被遍历，则将代表元素
            // 次序的某数组元素下标-1赋值给导航栏活跃元素的下标，将当前活跃元素的颜色改变
            if(index){
              this.currentIndex = index - 1
            }
            else {
              // 若当前页面位置为0，则将导航栏活跃元素的下标设为0，将导航栏中的商品的颜色改变
              this.currentIndex = 0
            }
            // 遍历次数+1
            times++
          }
          // 数组下标+1
          index++
        }
        // 当前位置是否显示backtop图标
        this.isActive = this.position <= velement.scrollTop
      },
      // 触摸屏幕时计算导航栏对应元素的位置
      // 当元素的位置不再刷新时则停止获取元素位置（比较获取元素位置前后的值，前后两次相等即为不刷新）
      check () {
        if(!this.isCheck){
          // 数组深拷贝，防止直接引用数组
          this.copyPositions = JSON.parse(JSON.stringify(this.positions))
          this.positions[1] = this.$refs.commodity.offsetHeight
          this.positions[2] = this.$refs.comment.offsetHeight + this.positions[1]
          this.positions[3] = this.$refs.parameter.offsetHeight + this.positions[2]
          this.positions[4] = this.$refs.recommend.offsetHeight + this.positions[3]
          // 对象不论值是否相同，直接比较都为false，转换为字符串后比较可比较值是否相同
          if(this.copyPositions.toString() === this.positions.toString()){
            // 已经计算导航栏对应元素的位置，后面不再计算
            this.isCheck = true
          }
        }
      },
      getMoreGoods () {
        getDetail(this.id).then((res) => {
          // 若服务器返回有效信息，则将结果保存
          if(res){
            const data = res.result
            this.Image = data.itemInfo.topImages

            // 2.3.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
            document.title = this.goods.title

            // 2.4.获取店铺信息
            this.shop = new Shop(data.shopInfo);

            // 2.5.获取商品信息
            this.detailInfo = data.detailInfo

            // 2.6.保存参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

            // 2.7.保存评论信息
            if (data.rate.list) {
              this.commentInfo = data.rate.list[0];
            }
          }
          // 若服务器没有返回有效信息
          else {
            this.$router.replace('/error')
          }
        })
      },
      getRecommend() {
        // 获取推荐商品信息
        getRecommend().then((res) => {
          this.recommendList = res.data.list
        })
      },
      addToCart() {
        const obj = {}
        // 将加入购物车的商品信息保存起来
        obj.id = this.id;
        obj.imgURL = this.Image[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc;
        obj.newPrice = this.goods.nowPrice;

        this.$store.commit('addCart', obj)
        // 添加完成，显示提示，三秒后消失
        this.isAdd = true
        setTimeout(() => {
          this.isAdd = false
        },3000)
      }
    }
  }
</script >

<style scoped >
  .add-shop {
    width: 60%;
    height: 10%;
    position: fixed;
    top: 45%;
    left: 20%;
    color: #fff;
    background-color: rgba(0, 0, 0, .4);
  }
  .add-shop img {
    width: 10%;
    height: 25%;
    color: #fff;
    margin: 5px 45% 5px 45%;
  }
  .add-shop span {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
</style >
