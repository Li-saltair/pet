<template>
    <view>
        <!-- 未付款订单的只允许去付款，超时订单会自动关闭，当前状态不涉及退款 -->
        <view v-if="orderInfo.tradeStatus == 1">
            <view
                class="primary-btn"
                @tap="goPay(orderInfo.tradeNumber, orderInfo.id)"
                >去付款</view
            >
        </view>
        <!-- 已付款但未接单的订单（未发生过退款的情况下），只允许退款、再买一单 -->
        <view v-if="orderInfo.tradeStatus == 4 && !orderInfo.tradeDetailList[0].tradeRefundInfoList.length > 0">
            <view
                class="primary-btn"
                @tap="afterSales(orderInfo.tradeNumber)"
                >退款</view
            >
        </view>
        <!-- 已接单但未发货的订单（未发生过退款的情况下），允许退款、再买一单 -->
        <view v-if="orderInfo.tradeStatus == 6 && !orderInfo.tradeDetailList[0].tradeRefundInfoList.length > 0">
            <view
                class="primary-btn"
                @tap="afterSales(orderInfo.tradeNumber)"
                >退款</view
            >
        </view>
        <!-- 已发货的订单，允许查看物流、马上收货、未发生过退款的情况下允许退款/退货退款、再买一单 -->
        <view v-if="orderInfo.tradeStatus == 8 && ">
            <view class="default-btn" @tap="viewLogistics(item.tradeNumber)"
                >查看物流</view
            >
            <view class="primary-btn" @tap="reveive(item.id)"
                >马上收货</view
            >
            <view class="primary-btn" @tap="createQrCodeOfOneTrade(item.tradeNumber)"
                >二维码</view
            >
            <view class="default-btn" @tap="afterSales(item.tradeNumber)" v-if="!orderInfo.tradeDetailList[0].tradeRefundInfoList.length > 0"
                >退款</view
            >
        </view>
        <!-- 确认签收的订单（未发生过退款的情况下）允许退款/退货退款、再买一单 -->
        <view v-if="orderInfo.tradeStatus == 9 && !orderInfo.tradeDetailList[0].tradeRefundInfoList.length > 0">
            <view
                class="primary-btn"
                @tap="afterSales(orderInfo.tradeNumber)"
                >退款</view
            >
        </view>
        <!-- 交易成功的订单允许查看物流、再买一单 -->
        <view v-if="orderInfo.tradeStatus == 19">
            <view class="default-btn" @tap="viewLogistics(item.tradeNumber)"
                >查看物流</view
            >
        </view>
        <!-- 交易关闭的订单允许删除 -->
        <view v-if="orderInfo.tradeStatus == 20">
            <view class="default-btn" @tap="deleteOrder(item.tradeNumber)"
                >删除订单</view
            >
        </view>

    </view>
</template>
<script>
export default {
    name:'orderListOperationButtonGroup',
    props:{

    },
    methods:{

    }
}
</script>