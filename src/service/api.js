// const prefix = "http://192.168.2.229:8080/api"; //本地开发
// const prefix = "http://192.168.2.23:8080/api"; //本地开发
// const prefix = "http://220.243.178.90:40003/api";   //开发环境
const prefix = "http://192.168.2.114:8080/api"; //生产环境   https://test.united.bat100.net/api    https://book.bat100.net/api
// const prefix = "https://hzkj.united.bat100.net/api"; //生产环境   https://test.united.bat100.net/api    https://book.bat100.net/api

/**
 * 定义后台api接口常量
 */
export default Object.freeze({
  login: prefix + "/login/user",
  logout: prefix + "/login?doLogout",
  sendVerifyCodeLogin: prefix + "/sms/sendVerifyCodeLogin",
  fileload: {
    downloadFile: prefix + "/fileload/downloadFile"
  },
  categories: {
    queryCategories: prefix + "/product/category/findTree"
  },
  shop: {
    //商品基本信息
    productBasicInfo: prefix + "/product/findByPage", //单页数量：size 当前页号：current（从1开始），可用于分类查询
    productDetail: prefix + "/product/get", //根据id查询单条
    findAllSkuByProduct: prefix + "/product/sku/findAll", //查询某个商品的所有规格
    findAllSkuByProductNew: prefix + "/product/sku/partner-group/list", //查询某个商品的所有规格(新增分销人分组后)
    querySkuInfoById: prefix + "/product/sku/partner-group/get", //根据sku id查询详情
    queryTemplateById: prefix + "/freight/template/findOne", //查询单条运费模版信息，包含配置详情，从商品信息中获取运费模板ID
    queryShopping: prefix + "/shopping-cart/pageSelf", //获取购物车列表
    submitShopping: prefix + "/shopping-cart/add",
    deleteShoppingItem: prefix + "/shopping-cart/delete", //删除购物车里面的一条
    shoppingPay: prefix + "/trade/submitpay",
    queryShoppingCount: prefix + "/shopping-cart/countSelf" //查询购物车sku件数（购物车上方显示的全部数量）
  },
  user: {
    saveAddress: prefix + "/user/delivery/address/saveOrUpdate", //保存新增或修改的地址
    queryUserAddressList: prefix + "/user/delivery/address/findByLogin", //查看当前登录人的所有地址列表
    deleteAddressById: prefix + "/user/delivery/address/a/delete", //逻辑删除一条地址
    queryAddressDetailById: prefix + "/user/delivery/address/a/getById", //根据id查询单条地址详情
    queryUserById: prefix + "/user/info/a/getOne", //根据id查询单条user信息
    saveLastestViewPartnerShop:
      prefix + "/user/partner/browse/saveBrowseByLogin", //保存当前录用户浏览的店铺记录
    queryLastestPartnerShop: prefix + "/user/partner/browse/getBrowseByLogin", //查询当前录用户最近浏览的5个店铺
    getPartnerUserInfo: prefix + "/partner/get", //不需权限，查询分销人信息
    updateUserInfo: prefix + "/user/info/refreshWxInfo", //更新用户信息
    checkPartner:prefix + '/partner/qualification/check',     //是否是分销人
  },
  order: {
    createOrder: prefix + "/trade/submit", //创建订单
    queryOrderByUserId: prefix + "/trade/findByPage", //分页查询订单（包含明细）
    /**
     * tradeRefundInfo<Object>:售后订单才会出现该字段
     * tradeRefundInfo<Object>[refundState]:退款状态 1-已退款， 2-未退款， 3-退款失败(第三方调用接口失败)， 4-退款中， 5-取消退款
     * tradeRefundInfo<Object>[confirmState]:商家是否同意退款：0-未处理，1同意，2不同意
     * records[tradeRefundStatus]:订单关闭状态，非售后订单不会出现此字段
     */
    queryOrderDetailById: prefix + "/trade/findOne", //根据订单id查询某个订单详情
    deleteOrderById: prefix + "/trade/delete", //根据订单id逻辑删除某个订单
    queryOrderLogistics: prefix + "/trade/logistics/getLogistics", //根据订单查询物流信息 queryParams : tradeNumber
    queryLogisticsDetailById:
      prefix + "/trade/logistics/detail/getLogisticsDetail",
    orderPayment: prefix + "/trade/pay", //支付某个订单
    submitRefundRequest: prefix + "/trade/refund-info/apply", //退货退款申请
    queryRefundDetailBytradeDetailId: prefix + "/trade/refund-info/a/getOne", //查询退款详情
    confirmOrderReceive: prefix + "/trade/signIn", //订单确认收货
    cancelOrder: prefix + "/trade/cancel",
    updateRefundInfo: prefix + "/trade/refund-info/a/saveOrUpdate", //更新退货退款信息
    getWxPayParams: prefix + "/trade/getWxPaySign", //根据订单编号获取微信支付所需的签名参数
    getWxPayParamsV2: prefix + "/trade/getWxPaySign/v2", //根据订单编号获取微信支付所需的签名参数
    cancelRefundRequest: prefix + "/trade/refund-info/cancelRefund", //取消退款
    queryOrderCanUsePayMethods: prefix + "/payment/trade/getPayMethodInfo", //获取订单可用的支付方式信息
    queryStatusOfOrderNumber: prefix + "/trade/count", //查询订单页面的订单数量，用于角标
    shoppingSubmitOrder: prefix + "/trade/submit/cart", //购物车提交订单
    queryFreight: prefix + "/trade/getTotalFreight", //获取运费post
    queryFreightV2: prefix + "/trade/calculateForShow", //获取运费post
    delayDelivery:prefix + '/trade/delayDelivery',      //延长收货
    queryLogisticsEnterprise: prefix + '/courier/findAll'
  },
  system: {
    queryQuestions: prefix + "/sys/common-question/a/findAll", //查询常见问题
    queryHotSearch: prefix + "/sys/hot-search/a/findAll", //系统热搜，搜索页
    uploadFile: prefix + "/file/upload", //上传文件
    getDefaultShopName: prefix + "/sys/config/getSelfStoreName", //获取店铺默认名称
    getFixedAddressById: prefix + "/sys/delivery-address/get", //查询单条地址
    queryQrcodeInfo:prefix + '/wx-mini/qrcode/getById',
    getProductQrCode:prefix + '/wx-mini/qrcode/create/product',
    getNotification:prefix + '/sys/notification/findAll',     //type:1:分销端；2:买家端
    queryProductFixedAddresses:prefix + '/sys/delivery-address/listByProduct',   //type: 0: 零售; 1: 预售;
    getConfiguration: prefix + '/sys/program/config/getSelfConfig',
  },
  recharge: {
    rechargeToAccount: prefix + "/recharge/rechargeCard", //给账户充值
    queryBalance: prefix + "/user/wallet/balance/getTotal", //查询用户总余额
    queryBalanceDetail: prefix + "/user/wallet/balance/getDeteailList", //查询余额明细
  }
});
