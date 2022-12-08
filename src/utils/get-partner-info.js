import Taro, { getCurrentInstance } from "@tarojs/taro";
import $CONSTANTS from "./constants";
import $request from "./request";
import $API from "../service/api";
import { validate } from "./request";

// 保存分销人信息
export function setPartnerInfo({ id, isAuthAccountId, other }) {
  return new Promise((resolve, reject) => {
    if (id) {
      $request(
        {
          url: $API.user.getPartnerUserInfo,
          data: {
            authAccountId: isAuthAccountId ? id : "",
            partnerUserInfoId: isAuthAccountId ? "" : id
          }
        },
        res => {
          if (validate(res) && res.data && res.data.hasOwnProperty('userInfo')) {
            const partnerId = res.data.userInfo.id;
            const avatar = res.data.storeLogo
              ? res.data.storeLogo
              : res.data.userInfo.wxAvatar
              ? res.data.userInfo.wxAvatar
              : res.data.userInfo.avatar;
            const displayName = res.data.storeName
              ? res.data.storeName
              : res.data.userInfo.wxNickName
              ? res.data.userInfo.wxNickName + "的店铺"
              : res.data.userInfo.defaultNickName + "的店铺";
            Taro.setStorageSync($CONSTANTS.PARTNER_INFO, {
              ...other,
              partnerId,
              avatar,
              displayName
            });
            resolve({ partnerId, avatar, displayName });
          } else {
            reject(false)
          }
        }
      );
    } else {
      // 直接从storage里获取
      const partnerInfo = Taro.getStorageSync($CONSTANTS.PARTNER_INFO);
      const partnerId = partnerInfo.partnerId;
      const avatar = partnerInfo.avatar;
      const displayName = partnerInfo.displayName;
      resolve({ partnerId, avatar, displayName });
    }
  });
}

// 提交浏览记录
export function submitBrowse(partnerUserInfoId) {
  return new Promise((resolve, reject) => {
    $request(
      {
        url: $API.user.saveLastestViewPartnerShop,
        method: "POST",
        data: { partnerUserInfoId }
      },
      response => {
        if (validate(response)) {
          resolve(true);
        }
      }
    );
  });
}

// 获取分销人信息
export function getPartnerInfo() {
  return new Promise((resolve, reject) => {
    const { partnerId, avatar, displayName } = Taro.getStorageSync(
      $CONSTANTS.PARTNER_INFO
    );
    resolve({ partnerId, avatar, displayName });
  });
}

// 保存浏览记录
export function saveBrowse(partnerId) {
  let browse = Taro.getStorageSync($CONSTANTS.ORIGIN_AND_SAVE_BROWSE) || [];
  const isLogind = Boolean(Taro.getStorageSync($CONSTANTS.COOKIE_NAME));
  if (isLogind) {
    // 直接提交
    submitBrowse(partnerId);
  } else if (!browse.find(item => item.partnerId == partnerId)) {
    browse.push({ partnerId: partnerId });
    Taro.setStorageSync($CONSTANTS.ORIGIN_AND_SAVE_BROWSE, browse);
  } 
}

//获取小程序码的信息
export function getQrcodeInfo(id) {
  return new Promise((resolve, reject) => {
    $request(
      {
        url: $API.system.queryQrcodeInfo,
        data: { id }
      },
      response => {
        if (validate(response)) {
          resolve(response.data);
        } else {
          reject('查询失败')
        }
      }
    );
  });
}

//清除分销人在本地的缓存
export function removePartnerInfo() {
  Taro.removeStorageSync($CONSTANTS.PARTNER_INFO)
}

//返回正确的分销人名称
export function getDisplayPartnerName({ storeName, nickName, wxNickName }) {
  if (storeName) return storeName;
  if (nickName) return nickName;
  if (wxNickName) return wxNickName;
}