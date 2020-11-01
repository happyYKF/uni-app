<template>
  <view>专辑详情</view>
</template>
<script>
export default {
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        first: 1,
      },
      id: -1,
    };
  },
  onLoad(options) {
    console.log(options);
    this.id = options;
    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: `http://service.picasso.adesk.com/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params,
      }).then((result) => {
        console.log(result);
      });
    },
  },
};
</script>
<style lang="scss">
</style>