<template>
  <scroll-view
    @scrolltolower="handleToLower"
    class="recommend_view"
    scroll-y
    v-if="recommend.length > 0"
  >
    <!--推荐 四张图 -->
    <view class="recommend_wrap">
      <view class="recommend_item" v-for="item in recommend" :key="item.id">
        <image mode="widthFix" :src="item.thumb"></image>
      </view>
    </view>
    <!-- 月份 -->
    <view class="monthes_wrap">
      <view class="monthes_title">
        <view class="monthes_title_info">
          <view class="monthes_info">
            <text>{{ monthes.DD }}/</text>
            {{ monthes.MM }}月
          </view>
          <view class="monthes_text">{{ monthes.title }} </view>
        </view>
        <view class="monthes_title_more">更多</view>
      </view>
      <view class="monthes_content">
        <view
          class="monthes_items"
          v-for="item in monthes.items"
          :key="item.id"
        >
          <image
            mode="aspectFill"
            :src="item.thumb + item.rule.replace('$<Height>', 360)"
          ></image>
        </view>
      </view>
    </view>

    <!-- 热门 -->
    <view class="host_wrap">
      <view class="host_title"><text>热门</text></view>
      <view class="host_content">
        <view class="host_item" v-for="item in hots" :key="item.id">
          <image mode="widthFix" :src="item.thumb"> </image>
        </view>
      </view>
    </view>
  </scroll-view>
</template>
<script>
//引入moment 三方库
import moment from "moment";
export default {
  data() {
    return {
      recommend: [],
      monthes: {},
      hots: [],
      params: {
        //获取几条
        limit: 30,
        //关键字
        order: "hot",
        //  跳过几条
        skip: 0,
      },
      hasMore:true
    };
  },
  mounted() {this.getList()},
  methods: {
    getList() {
      this.request({
        url: "http://service.picasso.adesk.com/v3/homepage/vertical",
        data: this.params,
      }).then((result) => {
         if(result.res.vertical.length === 0){
               this.hasMore = false
               return;
         }


        if(this.recommend.length === 0){
           //头部推荐模块
        this.recommend = result.res.homepage[1].items;
        //月份模块
        this.monthes = result.res.homepage[2];
        //将时间戳改成 18号/月  moment.js
        this.monthes.MM = moment(this.monthes.stime).format("MM");
        this.monthes.DD = moment(this.monthes.stime).format("DD");
        }
        this.hots =[...this.hots,...result.res.vertical] 
      });
    },
    handleToLower() {
       //当滚动条事件触发修改请求参数 skipt += limit
      //  重新发送请求
      // 请求回来成功 host 数组的叠加
      if(this.hasMore){
      this.params.skip += this.params.limit
      this.getList()
      }else{
         //弹窗
         uni.showToast({
            title:"没有数据了",
            icon:"none"
         })
      }
     
    },
  },
};
</script>
<style lang="scss" scoped>
.recommend_view {
  height: calc(100vh - 36px);
}

.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}

.monthes_wrap {
  .monthes_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    font-weight: 600;
    color: $color;
    .monthes_title_info {
      color: $color;
      font-size: 30rpx;

      display: flex;
      .monthes_info {
        text {
          font-size: 36rpx;
        }
      }
      .monthes_text {
        font-size: 34rpx;
        color: #6666;
        margin-left: 30rpx;
      }
      .monthes_title_more {
        font-size: 24rpx;
      }
    }
  }
  .monthes_content {
    display: flex;
    flex-wrap: wrap;
    .monthes_items {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}

.host_wrap {
  .host_title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid $color;
      font-size: 35rpx;
      font-weight: 600;
      padding-left: 20rpx;
    }
  }
  .host_content {
    display: flex;
    flex-wrap: wrap;
    .host_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
</style>