<template>
    <div id="hy-swiper">
      <div class="swiper" ref="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <slot></slot>
      </div>
      <div class="indicator">
        <!-- 可以把轮播图的点换成别的，默认是点-->
        <slot name="indicator" v-if="showIndicator && slideCount>1">
          <div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === copyIndex-1}" :key="index"></div>
        </slot>
      </div>
    </div>
</template>

<script>
  	import Bus from './Bus'
	export default {
		name: "Swiper",
    props: {
		  // 图片轮播间隔
      interval: {
		    type: Number,
        default: 3000
      },
      // 轮播过渡时长
      animDuration: {
		    type: Number,
        default: 300
      },
      // 滑动多少即自动滑到目标图片，0.25代表滑动四分之一
      moveRatio: {
        type: Number,
        default: 0.25
      },
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
		  return {
        // 元素个数
        slideCount: 0,
        // swiper的宽度
        totalWidth: 0,
        // swiper样式
        swiperStyle: {},
        // 当前的index
        currentIndex: 1,
        // 轮播图中下方处于活跃状态的点
        copyIndex: 1,
        // 是否正在滚动
        scrolling: false
      }
    },
    mounted: function () {
      // 1.操作DOM, 在前后添加Slide
      Bus.$on("loadAll", data => {
      // 通过事件总线在轮播图加载时进行操作
        if(data ) {
          this.handleDom()
        // 2.开启定时器
        this.startTimer();
        }
      })
    },
    methods: {
      /**
       * 操作DOM, 在DOM前后添加Slide
       */
      handleDom() {
        // 1.获取要操作的元素
        let swiperEl = this.$refs.swiper
        let slidesEls = swiperEl.childNodes

        // 2.保存个数
        this.slideCount = slidesEls.length;

        // 3.如果大于1个, 那么在前后分别添加一个slide
        if (this.slideCount > 1) {
          // 拷贝第一张和最后一张图片
          let cloneFirst = slidesEls[0].cloneNode(true);
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          // 将最后一张图片的副本插到最前面
          swiperEl.insertBefore(cloneLast, slidesEls[0]);
          // 将第一张图片的副本插到最后面
          swiperEl.appendChild(cloneFirst);
          // 重新计算元素宽度
          this.totalWidth = swiperEl.offsetWidth;
          this.swiperStyle = swiperEl.style;
        }

        // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
        this.setTransform(-this.totalWidth);
      },

		  /**
       * 定时器操作
       */
      startTimer() {
		    this.playTimer = window.setInterval(() => {
		      this.currentIndex++;
          this.checkIndex()
          this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval)
      },
      stopTimer() {
        window.clearInterval(this.playTimer);
      },

      /**
       * 滚动到正确的位置
       */
      scrollContent(currentPosition) {
        // 0.设置正在滚动
        this.scrolling = true;

        // 1.开始滚动动画
        this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
        this.setTransform(currentPosition);

        // 2.判断滚动到的位置
        this.checkPosition();

        // 4.滚动完成
        this.scrolling = false
      },

      /**
       * 校验正确的位置
       */
      checkPosition() {
        window.setTimeout(() => {
          // 1.校验正确的位置
          this.swiperStyle.transition = '0ms';
          if (this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
            this.setTransform(-this.currentIndex * this.totalWidth);
          } else if (this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }

          // 2.结束移动后的回调
          this.$emit('transitionEnd', this.currentIndex-1);
        }, this.animDuration)
      },

      /**
       * 设置滚动的位置
       */
      setTransform(position) {
        this.swiperStyle.transform = `translate(${position}px, 0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },

      checkIndex() {
        // 图片在最后一张过渡到第一张的过程中会有300ms指向另外两张图
        // 表示活跃图片的点会有短暂的时间处于全部不活跃的状态
        // 在图片切换到另外两张图的同时将活跃的点改为第一个，可避免空白的情况
        if(this.currentIndex > this.slideCount) {
          this.copyIndex = 1
        }
        else if(this.currentIndex <= 0) {
          this.copyIndex = this.slideCount
        }
        else {
          this.copyIndex = this.currentIndex
        }
      },

      /**
       * 拖动事件的处理
       */
      touchStart(e) {
        // 1.如果正在滚动, 不可以拖动
        if (this.scrolling) return;

        // 2.停止定时器
        this.stopTimer();

        // 3.保存开始滚动的位置
        this.startX = e.touches[0].pageX;
      },

      touchMove(e) {
        // 1.计算出用户拖动的距离
        this.currentX = e.touches[0].pageX;
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        let moveDistance = this.distance + currentPosition;

        // 2.设置当前的位置
        this.setTransform(moveDistance);
      },

      touchEnd(e) {
        // 1.获取移动的距离
        let currentMove = Math.abs(this.distance);

        // 2.判断最终的距离
        if (this.distance === 0) {
          return
        } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 右边移动超过0.25
          this.currentIndex--
          this.checkIndex()
        } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.25
          this.currentIndex++
          this.checkIndex()
        }

        // 3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 4.移动完成后重新开启定时器
        this.startTimer();
      }
    }
	}
</script>

<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>
