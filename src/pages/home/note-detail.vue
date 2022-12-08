<template>
  <view class="note-detail">
    <view class="note-detail-header" :style="{paddingTop:statusBarHeight+headerContentPaddingTop + 'px',height:headerContentHeight + 'px',width:headerWidth + 'px'}">
      <view class="note-user-info">
        <!-- swiper -->
        <image src="http://bat100.oss-cn-qingdao.aliyuncs.com/81cf7e19-7c1c-4c26-a0e9-6aa34c90a6b5.jpg?x-oss-process=image/quality,q_50"/>
        <view class="user-name">圣诞节过段时间吧</view>
      </view>
      <!-- <view class="to-follow-btn">关注</view> -->
      <view class="followed-btn">已关注</view>
    </view>
    <view class="note-detail-content">
      <!-- 上方的图片 -->
      <image class="note-image" src="http://bat100.oss-cn-qingdao.aliyuncs.com/a679d510-de31-4106-a995-8a766ed8a4e8.jpg?x-oss-process=image/quality,q_50"/>
      <!-- 标题和帖子内容 -->
      <view class="note-text">
        <view class="title">莎啦啦啦啦啦啦啦啦啦啦嘿嘿嘿黑恶黑</view>
        <view class="content">俗话说：无“农”不稳，无“工”不强，无“商”不富。这句话说明了农业、工业、服务业这三类产业的不同分工。农业解决基础温饱，商业（服务业）反映的是交易，工业（制造业）则是生产实实在在的产品，是推动服务业和农业发展的基本盘，所以工业是真正具有强大造血功能的产业。</view>
      </view>
      <!-- 发布时间等基本信息 -->
      <view class="note-basic">发布于2022-3-29 12:09:36</view>
      <!-- 评论 -->
      <view class="note-comments">
        <!-- 每一条独立的评论 -->
        <view class="unit-comment">
          <!-- 一级评论 -->
          <view class="first-level-info">
            <!-- 一级评论用户头像 -->
            <image src="http://bat100.oss-cn-qingdao.aliyuncs.com/6a820fda-8a53-4f42-90e7-6383a88e5204.jpg?x-oss-process=image/quality,q_50"/>
            <!-- 一级评论作者昵称和评论内容 -->
            <view class="comment-content">
              <view class="user-name">dsugdetygyv</view>
              <view class="content">第一个房间和好的结果何尝不是火车事故</view>
              <!-- 评论基础信息 -->
              <view class="note-basic">发布于 昨天19:09</view>
            </view>
          </view>
          <!-- 所有二级评论，默认只展示一条，点击查看更多展开一部分，直到展开所有 -->
          <view class="second-level-info">
            <!-- 时间最早的二级评论 -->
            <view class="second-level-info">
              <!-- 二级评论用户信息 -->
              <view class="user-info">
                <image src="http://bat100.oss-cn-qingdao.aliyuncs.com/6a820fda-8a53-4f42-90e7-6383a88e5204.jpg?x-oss-process=image/quality,q_50"/>
                <view class="user-name">dsugdetygyv</view>
              </view>
              <!-- 二级评论 -->
              <view class="comment-content">
                相宜本草再次传出拟二次冲击IPO的消息
              </view>
              <!-- 评论基础信息 -->
              <view class="note-basic">发布于 昨天19:09</view>
            </view> 
          </view>
          <view class="get-more">查看更多</view>
        </view>
      </view>
    </view>
    <!-- 下方点赞、评论、收藏和快捷评论的状态栏 -->
    <view class="note-detail-status"></view>
  </view>
</template>
<script>
import Taro, { getCurrentInstance } from "@tarojs/taro";
import './index.scss'
export default {
  name:'noteDeatil',
  data(){
    return {
      headerContentPaddingTop:0,
      headerContentHeight:0,
      statusBarHeight:0,
      headerWidth:0
    }
  },
  created(){
     //计算顶部距离
    const headerHeight = Taro.getStorageSync(this.$CONSTANTS.NAV_HEIGHT).navigationBarHeight
    this.statusBarHeight = Taro.getStorageSync(this.$CONSTANTS.NAV_HEIGHT).statusHeight
    const capsuleHeight = Taro.getStorageSync(this.$CONSTANTS.NAV_HEIGHT).capsuleHeight
    this.headerContentHeight = capsuleHeight
    this.headerContentPaddingTop = (headerHeight - capsuleHeight)/2
    this.headerWidth = Taro.getStorageSync(this.$CONSTANTS.NAV_HEIGHT).capsuleLeft
  },
  methods:{

  }
}
</script>