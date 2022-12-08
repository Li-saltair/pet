<template>
  <view class="search">
    <view class="search-input">
      <Icon class="search-icon" icon="icon-sousuo"/>
      <input
        type="text"
        placeholder="请输入关键字"
        focus
        clear
        :value="value"
        @input="handleInput"
        confirmType="search"
        @confirm="handleSearch"
      />
    </view>
    <view>
      <view v-if="serachHistoryList.length > 0">
        <view class="search-text">搜索历史</view>
        <view>
          <AtTag
            v-for="(item, index) in serachHistoryList"
            :key="index"
            :name="item"
            circle
            type="primary"
            :onClick="tagClick"
            >{{ item }}</AtTag
          >
        </view>
      </view>
      <view></view>
    </view>
    <view class="hot-search">
      <view class="search-text">大家都在搜</view>
      <view>
        <AtTag
          :name="item.keyWord"
          v-for="item in hotSearchList"
          :key="item.id"
          circle
          type="primary"
          :onClick="tagClick"
          >{{ item.keyWord }}</AtTag
        >
      </view>
    </view>
  </view>
</template>
<script>
import Taro from "@tarojs/taro";
import "./index.scss";
import { AtTag } from "taro-ui-vue";
import Icon from "./../../components/icon";
export default {
  name: "search",
  data() {
    return {
      value: "",
      hotSearchList: [],
      serachHistoryList: ""
    };
  },
  beforeMount() {
    this.serachHistoryList = Taro.getStorageSync(
      this.$CONSTANTS.SEARCH_HISTORY
    );
    Taro.setNavigationBarTitle({
      title: "搜索"
    });
    this.queryHotSearch();
  },
  components: { AtTag,Icon },
  methods: {
    handleInput(e) {
      this.value = e.detail.value;
    },
    handleSearch(value, event) {
      //数组
      let searchHistory = Taro.getStorageSync(this.$CONSTANTS.SEARCH_HISTORY);
      if (searchHistory.length >= 10) {
        searchHistory.shift();
      }
      searchHistory.push(this.value);
      Taro.setStorageSync(this.$CONSTANTS.SEARCH_HISTORY, searchHistory);
      Taro.navigateTo({
        url: `/pages/home/product-list?keyword=${this.value}`
      });
    },
    tagClick(e) {
      let searchHistory = Taro.getStorageSync(this.$CONSTANTS.SEARCH_HISTORY);
      if (searchHistory.length >= 10) {
        searchHistory.pop();
      }
      searchHistory.push(e.name);
      Taro.setStorageSync(this.$CONSTANTS.SEARCH_HISTORY, searchHistory);
      Taro.navigateTo({
        url: `/pages/home/product-list?keyword=${e.name}`
      });
    },
    queryHotSearch() {
      this.$request(
        {
          url: this.$API.system.queryHotSearch
        },
        res => {
          if (this.validate(res)) {
            this.hotSearchList = res.data;
          }
        }
      );
    }
  }
};
</script>