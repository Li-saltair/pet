import Vue from "vue";
import Vuex from "vuex";
import Taro from "@tarojs/taro";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    partnerInfo: {
      partnerId: "",
      avatar: "",
      displayName: ""
    },
    productDetailPartnerCanDisplay: false,
    homePartnerCanDisplay: false,
    partnerParam: {
      partnerId: "",
      other: "",
      isAuthAccountId: ""
    }
  },
  mutations: {
    partnerInfoUpdate(state, payload) {
      state.partnerInfo.partnerId = payload.partnerId;
      state.partnerInfo.avatar = payload.avatar;
      state.partnerInfo.displayName = payload.displayName;
    },
    productDetailPartnerLoadedUpdate(state, status) {
      state.productDetailPartnerCanDisplay = status;
    },
    homePartnerLoadedUpdate(state, status) {
      state.homePartnerCanDisplay = status;
    },
    partnerParamUpdate(state, partnerParam) {
      state.partnerParam = partnerParam;
    }
  },
  actions: {
    partnerInfoUpdate({ commit }, payload) {
      commit("partnerInfoUpdate", payload);
    },
    productDetailPartnerLoadedUpdate({ commit }, status) {
      commit("productDetailPartnerLoadedUpdate", status);
    },
    homePartnerLoadedUpdate({ commit }, status) {
      commit("homePartnerLoadedUpdate", status);
    },
    partnerIdUpdate({ commit }, status) {
      commit("partnerIdUpdate", status);
    }
  }
});
export default store;
