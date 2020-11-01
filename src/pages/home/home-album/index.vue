<template>
  <scroll-view
    scroll-y
    @scrolltolower="handleToLower"
    class="album_scroll_view"
  >
    <!-- 轮播图 -->
    <view class="album_swiper">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image mode="widthFix" :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>

    <!-- 列表 -->
    <view class="album_list">
      <navigator  
      class="album_item" 
      v-for="item in album" 
      :key="item.id"
      :url="`/pages/album/index?id=${item.id}`"
      >
        <view class="ablum_img">
          <image mpde="aspectFill" :src="item.cover"></image>
        </view>
        <view class="ablum_info">
          <view class="ablum_name">{{ item.name }}</view>
          <view class="ablum_desc"> {{ item.desc }}</view>
          <view class="ablum_btn">
            <view class="ablum_attention"> 关注 </view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>
<script>
export default {
  data() {
    return {
      parmas: {
        limit: 30,
        order: "new",
        skip: 0,
      },
      banner: [],
      album: [],
      hasMore: true,
    };
  },
  mounted() {
    //修改页面的标题
    uni.setNavigationBarTitle({ title: "专辑" }), this.getList();
  },
  methods: {
    //获取接口数据
    getList() {
      this.request({
        url: "http://service.picasso.adesk.com/v1/wallpaper/album",
        data: this.parmas,
      }).then((result) => {
        if (this.banner.length === 0) this.banner = result.res.banner;
        if (result.res.album.length === 0){this.hasMore = false;
         return;} 
        this.album = [...this.album, ...result.res.album];
      });
    },
    handleToLower() {
      if (this.hasMore) {
        this.parmas.skip += this.parmas.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.album_scroll_view {
  height: calc(100vh - 36px);
}

.album_swiper {
  swiper {
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}

.album_list {
  padding: 10rpx;
  .album_item {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1rpx solid #cccc;
    .ablum_img {
      flex: 1;
      padding: 10rpx;

      image {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .ablum_info {
      flex: 2;
      padding: 0 10rpx;
      overflow: hidden;
      .ablum_name {
        font-size: 30rpx;
        color: #000;
        padding: 10rpx 0;
      }
      .ablum_desc {
        font-size: 24rpx;
        padding: 10rpx 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .ablum_btn {
        padding: 10rpx;
        display: flex;
        justify-content: flex-end;
        .ablum_attention {
          color: $color;
          border: 1rpx solid $color;
          padding: 5rpx;
        }
      }
    }
  }
}
</style>