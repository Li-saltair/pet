<template>
  <view class="user">
    <view class="user-top" :style="{paddingTop:statusBarHeight + 'px'}">
      <view class="title" :style="{paddingTop:headerContentPaddingTop + 'px',lineHeight:headerContentHeight + 'px'}">我的</view>
      <view class="header">
        <image :src="avatar"/>
        <view class="user-text">
          <text>{{nickName}}</text>
          <text>喵喵id：{{userId}}</text>
        </view>
      </view>
      <view class="user-basic">
        <view>
          <Icon icon="icon-zan"/>
          <text>点赞和收藏</text>
        </view>
        <view>
          <Icon icon="icon-shoucang3"/>
          <text>关注</text>
        </view>
        <view>
          <Icon icon="icon-yiguanzhu"/>
          <text>粉丝</text>
        </view>
        <view>
          <Icon icon="icon-jianli"/>
          <text>笔记</text>
        </view>
      </view>
    </view>
    <view class="user-operation">
      <!-- <view class="tab-menu">
        <view v-for="(item,index) in tabMenu" :class="tabActive ===  index ? 'active' : ''" @tap="handleTabMenu(index)">{{item}}</view> 
      </view> -->
      <swiper class="user-pet">
        <!-- <swiper-item></swiper-item> -->
        <swiper-item>
          <view>
            <image mode="aspectFill" src="https://bat100-dev.oss-cn-qingdao.aliyuncs.com/file/14238e75729548eba5446c110afc40a463282129590785766971111_20210408150901.png"/>
          </view>
        </swiper-item>
      </swiper>
      <view class="user-data">
        <!-- 可能有2部分 -->
        <view class="tips-info">
          <text>猫猫待办</text>
          <view class="unit" v-for="item in tipsInfo" @tap="handleTips">
            <view class="main-info">
              <view class="title">
                <view class="title-text">{{item.title}}</view>
              </view>
              <view class="sub-title">{{item.subTitle}}</view>
            </view>
            <view class="status">
              <view v-if="item.status == 0" class="finish" @tap.stop="finish">完成啦</view>
              <Icon v-else icon="icon-biaoqian"/>
            </view>
          </view>
        </view>
        <!-- <view class="tips-info"></view> -->
      </view>
    </view>
  </view>
</template>
<script>
import Taro,{ getCurrentInstance } from "@tarojs/taro";
import {
  AtButton,AtBadge,AtMessage,
  AtModal,AtToast,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
} from "taro-ui-vue";
import Icon from "./../../components/icon";
import "./index.scss";

export default {
  name: "User",
  data() {
    return {
      headerContentPaddingTop:0,
      headerContentHeight:0,
      statusBarHeight:0,
      avatar:'https://bat100.oss-cn-qingdao.aliyuncs.com/pic/c9e998d154ca.png',
      nickName:'位于日本',
      userId:'8346567834',
      basicInfo:{

      },
      // tabMenu:['我的笔记','我的收藏','我的点赞'],
      tipsInfo:[
        {
          title:'定期驱虫',
          subTitle:'按时驱虫可以保证宝贝健康成长哦',
          status:0
        },{
          title:'疫苗第三针',
          subTitle:'接种前驱虫可以保证疫苗效果哦',
          status:1
        },{
          title:'投喂化毛膏',
          subTitle:'猫猫需要定期清理身体内的毛球哦',
          status:0
        },{
          title:'暂缓洗澡',
          subTitle:'三个月内的猫咪建议没有特殊情况先不要洗澡哦',
          status:0
        }
      ],
      tabActive:0,
      list:[]
    };
  },
  components: {
    AtButton,AtToast,Icon,
    AtModal,AtBadge,AtMessage,
    AtModalAction,
    AtModalContent,
    AtModalHeader,
  },
  computed:{
  },
  beforeMount() {

  },
  onShow(){
    const pageObj = Taro.getCurrentInstance().page
    const tabBar = Taro.getTabBar(pageObj)
    tabBar.selected = 2
    //计算顶部距离
    const headerHeight = Taro.getStorageSync(this.$CONSTANTS.NAV_HEIGHT).navigationBarHeight
    this.statusBarHeight = Taro.getStorageSync(this.$CONSTANTS.NAV_HEIGHT).statusHeight
    const capsule = Taro.getStorageSync(this.$CONSTANTS.NAV_HEIGHT).capsuleHeight
    this.headerContentHeight = capsule
    this.headerContentPaddingTop = (headerHeight - capsule)/2
  },
  methods: {
    // handleTabMenu(index){
    //   this.tabActive = index
    // },
    finish(){

    },
    handleTips(){

    }
  }
};
</script>
<style lang="scss">

</style>
<style>
page{
  margin-bottom:7rem;
}
</style>