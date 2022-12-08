import Vue from "vue";
import Taro from "@tarojs/taro";
import "./app.scss";
import request from "./utils/request";
import { validate, uploadFile } from "./utils/request";
import CONSTANTS from "./utils/constants";
import login from "./utils/login";
import {checkSubscribeAuth} from "./utils/common";
import "./assets/iconfont/iconfont.css"

import store from "./store/index";
import API from "./service/api";

const App = {
  onLaunch(options) {
    const systemInfo = Taro.getSystemInfoSync()
    Taro.setStorageSync(CONSTANTS.SYSTEM_INFO,systemInfo)
    //计算首页顶部整体的高度
    const statusHeight = systemInfo.statusBarHeight   //状态栏高度
    const custom = wx.getMenuButtonBoundingClientRect()
    const navigationBarHeight = custom.height + (custom.top - statusHeight) * 2 //导航栏高度
    const navHeight = navigationBarHeight + statusHeight  //导航栏+状态栏高度
    const capsuleHeight = custom.height   //胶囊高度
    const capsuleLeft = custom.left   //胶囊左侧的坐标
    Taro.setStorageSync(CONSTANTS.NAV_HEIGHT,{navHeight,statusHeight,navigationBarHeight,capsuleHeight,capsuleLeft})
  },
  async onShow(options) {
    const updateManager = Taro.getUpdateManager();

    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
    });

    updateManager.onUpdateReady(function() {
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    updateManager.onUpdateFailed(function() {
      // 新版本下载失败
    });
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h("block", this.$slots.default);
  },
  store
}

Vue.prototype.$CONSTANTS = CONSTANTS;
Vue.prototype.$request = request;
Vue.prototype.validate = validate;
Vue.prototype.$checkSubscribeAuth = checkSubscribeAuth;
Vue.prototype.uploadFile = uploadFile;
Vue.prototype.$API = API;
Vue.prototype.$login = login;
export default App;