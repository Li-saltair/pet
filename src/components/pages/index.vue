<template>
  <view>
    <AtLoadMore
      :onClick="handleLoadMoreClick"
      :status="loadingStatus"
      :moreBtnStyle="{
        width: '1px',
        height: '1px',
        border: '0',
        position: 'absolute',
        top: '-1px',
        left: '-1px'
      }"
    />
  </view>
</template>
<script>
import { AtLoadMore } from "taro-ui-vue";
export default {
  name: "pages",
  props: {
    totalData: Number,
    currentPage: Number,
    pages:Number
  },
  data() {
    return {
      loadingStatus:'more',        //默认可加载['more', 'loading', 'noMore']
    };
  },
  components: { AtLoadMore },
  watch: {
    currentPage(val) {
      //console.log(val,this.pages)
      if (val < this.pages) {
        this.handleLoadMoreClick();
      } else if(val == this.pages){
        this.handleLoadMoreClick();
        setTimeout(()=>{
          this.loadingStatus = "noMore";
        },100) 
      }
    },
    pages:{
      handler:function(val){   //同步状态
        if(val && val != 1){
          this.handleLoadMoreClick();
        } else if(val == 0 || val == 1){        //没有商品的情况
          this.loadingStatus = "noMore";
        }
      },
      immediate: true
    },
  },
  mounted(){
    this.handleLoadMoreClick()
    if(this.pages <= 1){
      this.loadingStatus = "noMore";
    }
  },
  methods: {
    handleLoadMoreClick() {
      this.loadingStatus = "loading";
    }
  }
};
</script>