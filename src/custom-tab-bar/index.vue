<template>
  <view class="tab-bar">
    <view class="tab-bar-border"></view>
    <view v-for="(item,index) in list" :key="item.pagePath" class="tab-bar-item" :class="[selected === index ? 'active' : '',index === 1 ? 'large' : '']" @tap="switchTab(index,item.pagePath)">
      <image class="icon" :src="selected === index ? item.selectedIconPath : item.iconPath"/>
      <view class="text">{{item.text}}</view>
    </view>
    <view class="release-modal" v-if="modalOpened" @tap="clickModal">
      <view class="release-menu" @tap="e=>contentClick(e)">
        <view @tap="gotoRelease(1)">日常有趣</view>
        <view @tap="gotoRelease(2)">铲屎心得</view>
        <view @tap="gotoRelease(3)">领养小可爱</view>
        <view @tap="gotoRelease(4)">猫猫相亲</view>
      </view>
      <view class="close" @tap="close">
        <image src="../assets/img/close.png"/>
      </view>
    </view>
  </view>
</template>
<script>
import Taro from '@tarojs/taro'
export default {
  name:'tabBar',
  data(){
    return {
      selected: 0,
      color: "#444",
      selectedColor: "#f60",
      list: [{
        pagePath: "/pages/index/index",
        iconPath: "../assets/img/home.png",
        selectedIconPath: "../assets/img/home-a.png",
        text: "首页"
      },{
        pagePath: "/pages/release/space",
        iconPath: "../assets/img/add.png",
        selectedIconPath: "../assets/img/add-a.png",
        text: "发布"
      }, {
        pagePath: "/pages/user/index",
        iconPath: "../assets/img/user.png",
        selectedIconPath: "../assets/img/user-a.png",
        text: "我的"
      }],
      modalOpened:false,
      closeImage:'../assets/img/close.png'
    }
  },
  methods:{
    switchTab(index,url){
      //发布不跳转
      if(index !== 1){
        Taro.switchTab({ url:url })
        this.selected = index
      } else{
        this.modalOpened = true
      }
    },
    close(){
      this.modalOpened = false
    },
    gotoRelease(p){
      Taro.navigateTo({
        url:`/pages/release/index?type=${p}`
      })
    },
    clickModal(e){
      this.modalOpened = false
    },
    contentClick(e){
      e.stopPropagation()
    }
  }
}
</script>
<style lang="scss">
.tab-bar{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4.3rem;
  background: white;
  display: flex;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  .tab-bar-border {
    background-color: rgba(0, 0, 0, 0.15);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
  }
  .tab-bar-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &.active{
      color:#ff8044;
    }
    .icon{
      width:2rem;
      height:2rem;
    }
    .text{
      font-size:0.9rem;
    }
    &.large{
      transform: translate(0,-18px);
      .icon{
        width:2.8rem;
        height:2.8rem;
        margin-bottom:8px;
        border-radius: 50%;
        border:10px solid #fff;
        background:#fff;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
      }
      
    }
  }
  .release-modal{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    background:#fff;
    border-radius:40px 40px 0 0;
    .release-menu{
      padding:1.8rem 1.2rem 0.8rem;
      view{
        padding:1rem;
        border-radius: 0.4rem;
        box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
        &:not(:last-child){
          margin-bottom:0.8rem;
        }
      }
    }
    .close{
      margin-top:1.6rem;
      margin-bottom:1.8rem;
      text-align: center;
      image{
        width:2.6rem;
        height:2.6rem;
      }
    }
    &::after{
      content:'';
      position: fixed;
      z-index:-1;
      top:0;
      bottom:0;
      left:0;
      right:0;
      background:rgba(0,0,0,0.5);
    }
  }
}
</style>