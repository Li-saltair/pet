<template>
  <view class="login">
    <view class="main-title" :style='{paddingTop:statusHeight,height:statusHeight,lineHeight:statusHeight}'>
      <text>登录</text>
    </view>
    <AtMessage />
    <view class="login-header">
      <!-- <image class="logo" style="border-radius:50%" :src="logoImg" /> -->
    </view>
    <AtToast :isOpened="toastOpened" :text="toastText" :onClose="toastClose" ></AtToast>
    <view class="login-content">
      <image class="login-img" 	mode="aspectFit" :src="cat" @tap="directLogin"/>
      <AtButton
        type="primary"
        :onClick="directLogin"
        >微信用户一键登录</AtButton
      >
    </view>
    <view class="agreement">
      <view>登录即视为您已阅读并同意</view>
      <view style="color:#6190E8;" @tap="goToService">《协议》</view>
    </view>
    <AtModal :isOpened="getPhoneNumberModel" :onClose="handlePhoneNumberClose">
      <AtModalHeader>微信授权</AtModalHeader>
      <AtModalContent>
        去授权手机号
      </AtModalContent>
      <AtModalAction>
        <button @tap="cancle">取消</button>
        <button openType="getPhoneNumber" @getphonenumber="getPhoneNumberEvent">
          确定
        </button>
      </AtModalAction>
    </AtModal>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import "./index.scss";
import cat from "../../assets/img/cat-login.png";
import {
  AtButton,AtInput,
  AtToast,AtMessage,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction
} from "taro-ui-vue";

export default {
  name: "Login",
  data() {
    return {
      toastText: "是客户的卡号",
      getPhoneNumberModel: false,
      cat,
      welcomeText:'',
      Protocol:'',
      toastOpened:false,
      statusHeight:'',
      navHeight:'',
      navigationBarHeight:''
    };
  },
  components: {
    AtButton,AtInput,
    AtModal,AtToast,
    AtModalHeader,
    AtModalContent,
    AtModalAction,
    AtMessage
  },
  beforeMount(){
    this.statusHeight = Taro.getStorageSync(this.$CONSTANTS.SYSTEM_INFO).statusBarHeight + 'px'
    this.navHeight = Taro.getStorageSync(this.$CONSTANTS.SYSTEM_INFO).navHeight + 'px'
    this.navigationBarHeight = Taro.getStorageSync(this.$CONSTANTS.SYSTEM_INFO).navigationBarHeight + 'px'
  },
  methods: {
    handlePhoneNumberClose() {
      this.getPhoneNumberModel = false;
    },
    directLogin(){
      this.$login({},false,res=>{
        if(!this.validate(res) && (res.code == 12 || res.code == 2)){
          this.getPhoneNumberModel = true;
        }
      })
    },
    getPhoneNumberEvent(e) {
      if (e.detail.errMsg == "getPhoneNumber:ok") {
        let postObj
        if(e.detail.code){
          console.log('手机号',e.detail.code)
          postObj = {
            phoneCode: e.detail.code
          };
        } else {
          postObj = {
            encryptedData: e.detail.encryptedData,
            vi: e.detail.iv,
          };
        }
        this.$login(postObj,false)
      }
    },
    cancle() {
      this.getPhoneNumberModel = false
    },
    toastClose(){
      this.toastOpened = false
    },
    goToService(){
      Taro.navigateTo({
        url:"/pages/user/service-agreement"
      })
    }
  }
};
</script>
<style>
page{
  background:#fff;
}
</style>