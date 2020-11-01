import Vue from 'vue';
import App from './App';
import request from './utils/request';
Vue.config.productionTip = false;
App.mpType = 'app';
Vue.prototype.request = request;
//定义全局数据
const app = new Vue({
  ...App,
});
app.$mount();
