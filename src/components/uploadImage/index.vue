<template>
  <scroll-view scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft"	enable-flex="true"  class="image-uploader">
    <view class="preview-image">
      <view v-for="(item, index) in files" :key="index">
        <image class="main-img" :src="item" />
        <Icon
          class="operation-btn"
          icon="icon-shanchu"
          @tap="deleteImg(index)"
        />
      </view>
    </view>
    <view @tap="uploadImg" v-if="files.length < 6" class="upload-img" id="upload-image-control">
      <Icon icon="icon-tianjia2"/>
      <text>上传图片</text>
      <text>最多6张</text>
    </view>
  </scroll-view>
</template>
<script>
import Icon from "../icon";
import "./index.scss";
export default {
  name: "uploadImage",
  props: {
    files: {
      type: Array,
      required:true
    },
    count: {
        type:[String, Number],
        default:3
    },
    sourceType:{
        type:Array,
        default:()=>{
            return ['album', 'camera']
        }
    },

  },
  data() {
    return {
      ownFile:[],
      // scrollLeft:0,
    };
  },
  components:{Icon},
  computed:{
    scrollLeft(){
      if(this.ownFile.length > 0){
        return 100*this.ownFile.length
      } else {
        return 0
      }
    }
  },
  methods: {
    deleteImg(index) {
      this.ownFile.splice(index, 1);
      this.$nextTick(()=>{
          this.$emit('change','remove',this.ownFile)
      })
    },
    uploadImg() {
      wx.chooseImage({
        count: this.count,
        sourceType: this.sourceType,
        success:res=> {
          this.ownFile = [...this.ownFile, ...res.tempFilePaths];
          this.$emit('change','add',this.ownFile)
        }
      });
    }
  }
};
</script>
