<template>
  <view class="p-icon iconfont" :class="icon"></view>
</template>
<script>
export default {
  name:'Icon',
  props:{
    icon:String
  }
}
</script>
<style lang="scss">
.p-icon{
  &.iconfont{
    font-size:1.6rem;
    color:#333;
  }
}
</style>