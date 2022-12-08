<template>
  <view class="home" :style="{paddingTop:statusBarHeight + 'px'}">
    <view class="header" :style="{paddingTop:headerContentPaddingTop + 'px',height:headerContentHeight + 'px'}">
      <view class="search" @tap="goToSearch">
        <Icon icon="icon-sousuo"/>
      </view>
      <view class="main">
        <view v-for="(item,key) in mode" :class="selectMode == key ? 'active':''">{{item}}</view>
      </view>
      <view class="notice">
       
      </view>
    </view>
    <view class="content">
      <scroll-view scroll-x="true" scroll-with-animation="true" class="elements">
         <!-- 目前是4个模块 -->
        <view class="unit-element" v-for="(item,key) in elements">{{item}}</view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
import Taro, { getCurrentInstance } from "@tarojs/taro";
import ProductItem from "./../../components/list/card-list";
import Icon from "./../../components/icon";
import "./index.scss";

import {
  AtIcon,AtNoticebar,
  AtList,
  AtListItem,
  AtMessage,
  AtButton,
  AtFloatLayout,
  AtAvatar,
  AtSearchBar
} from "taro-ui-vue";

export default {
  name: "Home",
  props:{
    tabBarHeight:{
      type:String
    }
  },
  data() {
    return {
      headerContentPaddingTop:0,
      headerContentHeight:0,
      statusBarHeight:0,
      mode:{
        1:'推荐',
        2:'关注'
      },
      selectMode:1,     //1：推荐，2：关注
      elements:{
        1:'日常有趣',
        2:'铲屎心得',
        3:'领养小可爱',
        4:'猫猫相亲',
        5:'新手上路'     //这个后续需要征求一下是否添加，有时间就加上
      }
    };
  },
  components: {
    AtList,AtNoticebar,
    AtIcon,Icon,
    AtSearchBar,
    AtListItem,
    AtFloatLayout,
    AtMessage,
    AtAvatar,
    AtButton
  },
  created() {
    
  },
  mounted() {
    
  },
  onPullDownRefresh(){
    console.log('下拉刷新')
  },
  onShow(){
    //配置tabBar选中的值
    const pageObj = Taro.getCurrentInstance().page
    const tabBar = Taro.getTabBar(pageObj)
    tabBar.selected = 0
    //计算顶部距离
    const headerHeight = Taro.getStorageSync(this.$CONSTANTS.NAV_HEIGHT).navigationBarHeight
    this.statusBarHeight = Taro.getStorageSync(this.$CONSTANTS.NAV_HEIGHT).statusHeight
    const capsule = Taro.getStorageSync(this.$CONSTANTS.NAV_HEIGHT).capsuleHeight
    this.headerContentHeight = capsule
    this.headerContentPaddingTop = (headerHeight - capsule)/2
  },
  computed: {

  },
  methods: {
    goToSearch(){
      Taro.navigateTo({
        url:'/pages/home/search'
      })
    }
  }
};
</script>
<style>
page{
  margin-bottom:4.8rem;
}
</style>