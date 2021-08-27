<template>
  <div v-if="Object.keys(commentInfo).length !== 0" id="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多</div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images" alt="">
      </div>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
		name: "DetailCommentInfo",
    props: {
		  commentInfo: {
		    type: Object,
      }
    },
    filters: {
		  showDate(value) {
		    let dates = new Date(value*1000)
        let year = dates.getFullYear()
        let month = dates.getMonth() + 1;
        let date = dates.getDate();
        return year + (month < 10 ? "-0" : "-") + month + (date < 10 ? "-0" : "-") + date
      }
    }
	}
</script>

<style scoped>
  #comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
    background-color: #fff;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 30px;
    font-size: 13px;
    line-height: 50px;
  }

  .header-more::after {
    content: '';
    display: inline-block;
    position: relative;
    width: 15px;
    height: 15px;
    top: 3px;
    left: 10px;
    transform: rotate(180deg);
    background: url("~common/back.svg") 0 0 / 15px 15px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
