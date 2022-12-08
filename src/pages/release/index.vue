<template>
  <view class="release">
    <!-- 日常：1 -->
    <view v-if="type == 1" class="release-content">
      <textarea class="release-text" @blur="textAreaBlur" auto-focus placeholder="发点好玩的" v-model:value="content"/>
      <UploadImage @change="imageChange" :count="6" :files="files"/>
    </view>
    <!-- 铲屎心得：2 -->
    <view v-if="type == 2" class="release-content">
      <textarea class="release-text" @blur="textAreaBlur" auto-focus placeholder="发点好玩的" v-model:value="content"/>
      <UploadImage @change="imageChange" :count="6" :files="files"/>
    </view> 
    <!-- 领养：3 -->
    <view v-if="type == 3" class="release-content">
      <view class="quick-select">选择我的小可爱</view>
      <view class="block-content">
        <!-- 品种 -->
        <view>
          <text>品种</text>
          <picker :range="breed" :value="breedSelected" @change="breedChange">
            <view class="picker">
              <view v-if="parseInt(breedSelected) >= 0 && parseInt(breedSelected) < breed.length">{{breed[breedSelected]}}</view>
              <view v-else>请选择品种</view>
            </view>
          </picker>
        </view>
        <!-- 年龄 -->
        <view>
          <text>出生时间</text>
          <picker mode='date' :value="birthDate" start="2000-01-01" @change="birthDateChange">
            <view class="picker">
              <view v-if="birthDate">{{birthDate}}</view>
              <view v-else>请选择出生日期</view>
            </view>
          </picker>
        </view>
        <!-- 性别 -->
        <view>
          <text>性别</text>
          <label class="radio-label">
            <radio value="r1" color="#ff8044" />
            <text>男生</text>
          </label>
          <label class="radio-label">
            <radio value="r1" color="#ff8044" checked="true"/>
            <text>女生</text>
          </label>
        </view>
        <!-- 来源 -->
        <view>
          <text>来源</text>
          <picker :range="origin" :value="originSelected" @change="originChange">
            <view class="picker">
              <view v-if="parseInt(originSelected) >= 0 && parseInt(originSelected) < origin.length">{{origin[originSelected]}}</view>
              <view v-else>请选择来源</view>
            </view>
          </picker>
        </view>
        <!-- 图片 -->
        <view>
          <UploadImage @change="imageChange" :count="6" :files="files"/>
        </view>
        <!-- 诉求 -->
        <view>
          <text>诉求</text>
          <textarea v-model:value="describe" placeholder="为了给它找到最适合他的铲屎官，请一定要说点什么哦" />
        </view>
        <view>
          <text>联系方式</text>
          <textarea v-model:value="contact" placeholder="您的个人信息会妥善保存，需要您授权对方才可以查看联系方式，喵~" />
        </view>
      </view>
    </view>
    <!-- 相亲：4 -->
    <view v-if="type == 4" class="release-content">
      <view class="quick-select">选择我的小可爱</view>
      <view class="block-content">
        <!-- 品种 -->
        <view>
          <text>品种</text>
          <picker @change="breedChange">
            <view class="picker">
              <view v-if="breedSelected">{{breedSelected}}</view>
              <view v-else>请选择品种</view>
            </view>
          </picker>
        </view>
        <!-- 年龄 -->
        <view>
          <text>出生时间</text>
          <picker mode='date' :value="birthDate" start="2000-01-01" @change="birthDateChange">
            <view class="picker">
              <view v-if="birthDate">{{birthDate}}</view>
              <view v-else>请选择出生日期</view>
            </view>
          </picker>
        </view>
        <!-- 性别 -->
        <view>
          <text>性别</text>
          <label class="radio-label">
            <radio value="r1" color="#ff8044" />
            <text>男生</text>
          </label>
          <label class="radio-label">
            <radio value="r1" color="#ff8044" checked="true"/>
            <text>女生</text>
          </label>
        </view>
        <!-- 诉求 -->
        <view>
          <text>诉求</text>
          <textarea v-model:value="describe" placeholder="为了给它找到最适合他的铲屎官，请一定要说点什么哦" />
        </view>
        <!-- 图片 -->
        <view>
          <UploadImage @change="imageChange" :count="6" :files="files"/>
        </view>
        <!-- 备注 -->
        <view>
          <text>备注</text>
          <textarea v-model:value="remark" placeholder="还有什么需要补充哒可以写在这里哦" />
        </view>
        <view>
          <text>联系方式</text>
          <textarea v-model:value="contact" placeholder="您的个人信息会妥善保存，需要您授权对方才可以查看联系方式，喵~" />
        </view>
      </view>
    </view>
    <view class="submit">
      <view class="submit-content" @tap="submit">发布</view>
    </view>
  </view>
</template>
<script>
import Taro, { getCurrentInstance } from "@tarojs/taro";
import UploadImage from './../../components/uploadImage/index'
import './index.scss'
export default {
  name:'Release',
  data(){
    return {
      type:4,
      files:[],
      content:'',
      origin:['家养','野外小流浪','家中大猫的宝宝'],
      breed:['英短','美短','苏格兰折耳'],
      breedSelected:'',
      birthDate:'',
      originSelected:'',
      describe:'',
      contact:''
    }
  },  
  onShow(){
    
  },
  components:{
    UploadImage
  },
  created(){
    // this.type = getCurrentInstance().router.params.type
    Taro.setNavigationBarTitle({
      title: "发布"
    });
  },
  methods:{
    textAreaBlur(){

    },
    imageChange(operationType,files){
      this.files = files
    },
    breedChange(e){
      //此处的value拿到的只是当前数组中的索引，所以实际使用需要转换为对应的值
      this.breedSelected = e.detail.value
    },
    birthDateChange(e){
      this.birthDate = e.detail.value
    },
    originChange(e){
      this.originSelected = e.detail.value
    },
    submit(){
      console.log(this.content)
    },
  }
}
</script>