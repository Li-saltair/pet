<template>
    <!-- 支付方式 -->
    <!--       v-if="pureBalanceList.length > 0 || combinationBalanceList.length > 0" -->
    <AtFloatLayout
      class="pay-type-modal"
      :isOpened="payMethodsModal"
      :onClose="closeModal"
      :scrollY="false"
    >
      <!-- 总额<=余额:可余额支付 -->
      <!-- 总额>余额:可选择组合支付,显示账户余额金额和微信支付金额 -->
      <view class="total-amount">
        <text>¥</text>
        {{totalPrice}}
      </view>
      <view class="pay-type">
        <view @tap="handlePayTypeSelected({type:1})">
          <view class="wx-pay">
            <view>
              <view>
                <image :src="img.wxPay" />
                <text>在线支付</text>
              </view>
              <view
                class="circle-sign"
                :class="{ selected: selectedPayMode == 1 }"
              ></view>
            </view>
          </view>
        </view>
        <view>
          <!-- v-if="item.amount >= totalPrice" -->
          <!-- <template v-show="pureBalanceList.length > 0"> -->
            <!-- v-show="pureBalanceList.length > 0" -->
            <view v-if="balanceList && balanceList.length > 0">
              <view
                class="balance-pay"
                v-for="item in balanceList"
                v-show="item.amount/100 >= totalPrice"
                :key="item.bfCode"
                :class="{
                selected: selectedPayMode == 2 && item.bfCode == balancePayBfCode
                }"
                @tap="handlePayTypeSelected({type:2, bfCode:item.bfCode})"
              >
                <view>
                  <view>
                    <image :src="img.balancePay" />
                    <text>{{`${item.belongs ? "店铺" : "通用"}余额支付(¥${item.amount/100})`}}</text>
                  </view>
                  <view
                    class="circle-sign"
                    :class="{selected: selectedPayMode == 2 && item.bfCode == balancePayBfCode}"
                  ></view>
                </view>
              </view>
            </view>
          <!-- </template>
          <template v-show="combinationBalanceList.length > 0"> -->
            <!-- v-show="combinationBalanceList.length > 0" -->
            <view>
            <view class="balance-pay"
                v-for="item in balanceList"
                v-show="item.amount > 0 && item.amount/100 < totalPrice"
                :key="item.bfCode"
                :class="{
                selected: selectedPayMode == 2 && item.bfCode == balancePayBfCode
                }"
                @tap="handlePayTypeSelected({type:3, bfCode:item.bfCode,cash:(totalPrice-item.amount/100).toFixed(2),balance:item.amount/100})">
                <view>
                  <view>
                      <image :src="img.balancePay" />
                      <text>{{`${item.belongs ? "店铺" : "通用"}余额支付`}}</text>
                  </view>
                  <view>
                      <view style="margin-right:0.4rem;color:#888">可组合支付</view>
                      <view
                      class="circle-sign"
                      :class="{
                          selected: selectedPayMode == 3 && item.bfCode == balancePayBfCode
                      }"
                      ></view>
                  </view>
                </view>
                <view class="balance-content" :class="{ 'can-not-use': true }">
                <view>
                    <view>账户余额</view>
                    <view>¥{{item.amount/100}}</view>
                </view>
                <view>
                    <view>微信支付</view>
                    <view>¥{{(totalPrice-item.amount/100).toFixed(2)}}</view>
                </view>
                </view>
            </view>
            </view>
          <!-- </template> -->
        </view>
      </view>
      <view class="pay-btn">
        <AtButton type="primary" circle :on-click="goToPay" :disabled="!selectedPayMode || clicked">立即付款</AtButton>
      </view>
    </AtFloatLayout>
</template>

<script>
import {AtFloatLayout,AtButton} from "taro-ui-vue";
import wxPay from "../../assets/img/wx-pay.png";
import balancePay from "../../assets/img/balance-pay.png";
export default {
    name: "payMethods",
    data(){
        return{
            img:{
               wxPay, balancePay
            },
            selectedPayMode:"",//已选支付方式，{1:微信支付,2:余额支付}
            balancePayBfCode:'',
            cashAmountOfCombination:'',
            balanceAmountOfCombination:''
        }
    },
    props:{
        totalPrice:{
            type:[String,Number],
            required:true
        },
        balanceList:{
            type:Array,
            required:true
        },
        payMethodsModal:{
            type:Boolean,
            required:true,
            default:false
        },
        clicked:{
          type:Boolean,
          default:true
        }
    },
    components:{AtFloatLayout,AtButton},
    computed:{
        pureBalanceList(){
            return this.balanceList.filter(item => item.amount/100 >= this.totalPrice)
        },
        combinationBalanceList(){
            return this.balanceList.filter(item => item.amount > 0 && item.amount/100 < this.totalPrice)
        }
    },
    methods:{
      /*type:{1:'微信支付',2:'余额支付',3:'组合支付'}*/
        handlePayTypeSelected({type, bfCode, balance, cash}) {
            this.selectedPayMode = type;
            if (type == 2) {
              this.balancePayBfCode = bfCode;
            }
            if(type == 3){
              this.balancePayBfCode = bfCode;
              this.cashAmountOfCombination = cash
              this.balanceAmountOfCombination = balance
            }
        },
        openModal(){
            this.payModal = true
        },
        closeModal() {
            this.$emit('closeModal')
            this.selectedPayMode = ''
        },
        goToPay(amountObj = undefined){
          if(this.selectedPayMode != 3){
            this.$emit('goToPay',this.selectedPayMode,this.balancePayBfCode)
          } else {
            //组合支付
            this.$emit('goToPay',this.selectedPayMode,this.balancePayBfCode,{balanceAmount:this.balanceAmountOfCombination,cashAmount:this.cashAmountOfCombination})
          }
        }
    }
}
</script>
<style lang="scss">
.pay-type-modal{
    text-align: center;
    .total-amount{
      >text{
        font-size:1rem;
      }
      font-size:2.2rem;
      margin-bottom:0.8rem;
    }
    .at-float-layout__container {
      height:900rpx
    }
    .at-float-layout{
      .layout-header {
        height: 2.2rem;
        line-height: 2.2rem;
        padding: 0 18rpx;
      }
    }
    .layout-body__content {
      height:900rpx;
      padding: 0.2rem 0 0.8rem 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .layout-body {
      height:900rpx
    }
    >view{
      padding:0.7rem;
      box-sizing: border-box;
      .wx-pay{
        >view{
          display:flex;
          justify-content: space-between;
          align-items: center;
          padding:0.8rem 0;
          border-bottom:1PX solid #f2f2f2;
          >view{
            display:flex;
            align-items: center;
            >image{
              width:1.3rem;
              height:1.3rem;
              margin-right:0.4rem;
            }
            >text{
              letter-spacing: 0.05rem;
              font-size:1rem;
            }
          }
          .circle-sign{
            width:0.72rem;
            height:0.72rem;
            padding:0.2rem;
            border:2PX solid #ddd;
            border-radius:50%;
            &.selected{
              position: relative;
              border:2PX solid #4d81ef;
              &::before{
                content:'';
                position: absolute;
                left:0.2rem;
                right:0.2rem;
                top:0.2rem;
                bottom:0.2rem;
                background:#4d81ef;
                border-radius: 50%;
              }
            }
          }
        } 
      }
      .balance-pay{
        >view{
          display:flex;
          justify-content: space-between;
          align-items: center;
          padding:0.7rem 0;
          >view{
            display:flex;
            align-items: center;
            >image{
              width:1.3rem;
              height:1.3rem;
              margin-right:0.4rem;
            }
            >text{
              letter-spacing: 0.05rem;
              font-size:1rem;
            }
          }
          .circle-sign{
            width:0.72rem;
            height:0.72rem;
            padding:0.2rem;
            border:2PX solid #ddd;
            border-radius:50%;
            &.selected{
              position: relative;
              border:2PX solid #4d81ef;
              &::before{
                content:'';
                position: absolute;
                left:0.2rem;
                right:0.2rem;
                top:0.2rem;
                bottom:0.2rem;
                background:#4d81ef;
                border-radius: 50%;
              }
            }
          }
        }
        .balance-content{
          padding-top:0;
          padding-left:0;
          padding-right:0;
          padding-bottom:0.7rem;
          border-bottom:1PX solid #f2f2f2;
          &.can-not-use{
            opacity: 0.7;
          }
          color:#444;
          flex-direction: column;
          >view{
            width:100%;
            display:flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom:0.6rem;
            &:last-child{
              margin-bottom:0
            }
          }
        }
      }
    }
    .pay-btn{
      position: fixed;
      bottom: 1.3rem;
      left: 0.8rem;
      right: 0.8rem;
      .at-button{
        border: 0;
        background: linear-gradient(290deg, #f79983 0%, #ec553d 100%);
        height: 80rpx;
        line-height: 80rpx;
        font-size: 0.9rem;
      }
    }
  }
</style>