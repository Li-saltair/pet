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
    // loadingStatus:'more',        //默认可加载['more', 'loading', 'noMore']
    loadingStatus:{
      type:String,
      default:'more',
      required:true
    }
  },
  data() {
    return {
      
    };
  },
  components: { AtLoadMore },
  mounted(){
    this.handleLoadMoreClick()
  },
  methods: {
    handleLoadMoreClick() {
      this.loadingStatus = "loading";
    }
  }
};
</script>