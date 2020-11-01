<template>
  <view>
    <view class="home_tab">
      <view class="home_tab_title">
        <view class="title_inner">
          <uni-segmented-control
            :current="current"
            :values="items.map((v) => v.title)"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#d4237a"
          >
          </uni-segmented-control>
        </view>
        <view class="iconfont search">&#xe661;</view>
      </view>
      <view class="home_tab_content">
        <view v-if="current === 0">
          <home-recommend> </home-recommend>
        </view>
        <view v-if="current === 1">
          <home-category> </home-category>
        </view>
        <view v-if="current === 2">
          <home-new> </home-new>
        </view>
        <view v-if="current === 3">
          <home-album> </home-album>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import HomeAlbum from "./home-album";
import HomeCategory from "./home-category";
import HomeNew from "./home-new";
import HomeRecommend from "./home-recommend";
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    HomeAlbum,
    HomeCategory,
    HomeNew,
    HomeRecommend,
    uniSegmentedControl,
  },
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
      current: 3,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
  onLoad(){
     this.request({
        url:"http://service.picasso.adesk.com/v3/homepage/vertical"
     }).then(res=>{
        console.log(res);
     })
  }
};
</script>
<style lang="scss">
.home_tab {
  .home_tab_title {
     position: relative;
    .title_inner {
       width: 60%;
       margin: 0 auto;
    }
    .search{
       position: absolute;
       top: 50%;
       transform: translateY(-50%);
       right: 5%;
    }
  }
//   .home_tab_content {
//   }
}
</style> 