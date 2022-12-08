<template>
  <view> </view>
</template>
<script>
import Taro from "@tarojs/taro";
import {checkSubscribeAuth} from "../../utils/common";
export default {
  name: "payButton",
  data() {
    return {};
  },
  methods: {
    wxPay(postObj) {
      return new Promise((resolve, reject) => {
        Taro.login({
          success: codeRes=>{
            if (codeRes.code) {
              let payBody = {
                amount:postObj.amount,
                paymentList:[{
                  payMethod: 1,
                  amount:postObj.amount
                }]
              }
              if(postObj.tradeNumber){
                payBody.tradeNumber = postObj.tradeNumber
              } else {
                payBody.tradeNumberMerge = postObj.tradeNumberMerge
              }
              this.$request(
                {
                  url: this.$API.order.getWxPayParamsV2,
                  method: "POST",
                  "Content-Type": "application/json",
                  data: {code:codeRes.code,...payBody}
                },
                response => {
                  if (this.validate(response) && response.data) {
                    wx.requestPayment({
                      appId: response.data.appId,
                      timeStamp: response.data.timeStamp,
                      nonceStr: response.data.nonceStr,
                      package: response.data.package,
                      signType: response.data.signType,
                      paySign: response.data.paySign,
                      success: successRes => {
                        console.log(successRes)
                        if (successRes.errMsg == "requestPayment:ok") {
                          resolve("支付成功");
                        }
                      },
                      fail: failRes => {
                        if (this.$CONSTANTS.WEIXIN_PAY_TYPE != "prod") {
                          resolve("支付成功");
                        } else {
                          reject("支付失败");
                        }
                      }
                    });
                  } else {      //通联测试环境
                    if (this.$CONSTANTS.WEIXIN_PAY_TYPE != "prod") {
                      //checkSubscribeAuth({tmplIds:['HnLgR29Xhhu10SpWM2Ad8mdSWj3qf7m3UottC1ZRrCg']})
                      resolve("支付成功");
                    } else {
                      reject("支付失败");
                    }
                  }
                }
              );
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        
      });
    },
    balancePay(postObj) {
      return new Promise((resolve, reject) => {
        let payBody = {
          tradeMethod: 0,
          paymentList:[{
            payMethod: 2,
            userWalletBalanceBfCode: postObj.userWalletBalanceBfCode,
            amount:postObj.amount
          }]
        }
        if(postObj.tradeNumber){
          payBody.tradeNumber = postObj.tradeNumber
        } else {
          payBody.tradeNumberMerge = postObj.tradeNumberMerge
        }
        Taro.login({
          success:(codeRes) => {
            if (codeRes.code) {
              this.$request(
                {
                  url: this.$API.order.orderPayment,
                  method: "POST",
                  "Content-Type": "application/json",
                  data: {code:codeRes.code,...payBody}
                },
                r => {
                  if (this.validate(r)) {
                    resolve("支付成功");
                  } else {
                    reject(`支付失败，${r.msg}`);
                  }
                }
              );
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      });
    },
    combinationPay(postObj){
      return new Promise((resolve,reject)=>{
        let wxParams = {
          paymentList:[{
            payMethod: 2,
            userWalletBalanceBfCode: postObj.userWalletBalanceBfCode,
            amount:postObj.balanceAmount
          },{
            payMethod: 1,
            amount:postObj.cashAmount
          }]
        }
        if(postObj.tradeNumber){
          wxParams.tradeNumber = postObj.tradeNumber
          wxParams.amount = postObj.cashAmount
        } else {
          wxParams.tradeNumberMerge = postObj.tradeNumberMerge
          wxParams.amount = postObj.cashAmount
        }
        Taro.login({
          success: codeRes => {
            if (codeRes.code) {
              this.$request(
                {
                  url: this.$API.order.getWxPayParamsV2,
                  method: "POST",
                  "Content-Type": "application/json",
                  data: {code:codeRes.code,...wxParams}
                },
                response => {
                  if (this.validate(response) && response.data) {
                    wx.requestPayment({
                      appId: response.data.appId,
                      timeStamp: response.data.timeStamp,
                      nonceStr: response.data.nonceStr,
                      package: response.data.package,
                      signType: response.data.signType,
                      paySign: response.data.paySign,
                      success: successRes => {
                        if (successRes.errMsg == "requestPayment:ok") {
                          resolve("支付成功"); 
                        }
                      },
                      fail: failRes => {
                        if (this.$CONSTANTS.WEIXIN_PAY_TYPE != "prod") {
                          resolve("支付成功");
                        } else {
                          reject(`支付失败`);
                        }
                      }
                    });
                  } else {      //通联测试环境
                    if (this.$CONSTANTS.WEIXIN_PAY_TYPE != "prod") {
                      resolve("支付成功");
                    } else {
                      reject("支付失败");
                    }
                  }
                })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        
      })
    }
  }
};
</script>
