import Taro, { request,getCurrentInstance } from "@tarojs/taro";
import $CONSTANTS from "./constants";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误），请登录。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

/**
 * 异常处理程序
 */
const errorHandler = response => {
  const { statusCode } = response;

  if (statusCode > 400) {
    if (response && response.statusCode) {
      const errorText = codeMessage[response.statusCode] || response.statusText;
      Taro.atMessage({
        message: errorText,
        type: "error"
      });
      if (statusCode == 401) {
        //Taro.clearStorageSync();
        Taro.removeStorageSync($CONSTANTS.COOKIE_NAME)
        Taro.removeStorageSync($CONSTANTS.USER_INFO)
        Taro.removeStorageSync($CONSTANTS.wxLoginCode)
        if($CONSTANTS.COOKIE_NAME && $CONSTANTS.COOKIE_NAME.length > 0){
          Taro.showModal({
            title: '提示',
            content: '您的登录状态已经过期了，是否要现在重新登录？',
            success: function (res) {
              if (res.confirm) {
                Taro.navigateTo({ url: "/pages/login/index" });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
          Taro.navigateTo({ url: "/pages/login/index" });
        }
      }
    } else if (!response) {
      Taro.atMessage({
        message: "您的网络发生异常，无法连接服务器",
        type: "error"
      });
    }
    return false;
  }
  return true;
};

// 添加拦截器
const interceptor = function(chain) {
   const cookieName = Taro.getStorageSync($CONSTANTS.COOKIE_NAME);
  if (cookieName.trim()) {
    chain.requestParams.header["Cookie"] = cookieName
  }
  return chain.proceed(chain.requestParams);
};
Taro.addInterceptor(interceptor);

export default (options, success, fail) => {
  options = {
    method: "GET",
    ...options
  };
  options.showLoading =
    options.showLoading != null ? options.showLoading : true;

  if (options.showLoading)
    Taro.showLoading({
      title: "加载中..."
    });
  request({
    url: options.url,
    data: options.data,
    header: {
      "Content-Type": options["Content-Type"]
        ? options["Content-Type"]
        : options.method.toUpperCase() == "POST"
        ? "application/x-www-form-urlencoded"
        : "application/json",
        'Cache-Control':options["Cache-Control"] ? options["Cache-Control"] :'public,no-cache',
        'Date':new Date().toUTCString()
    },
    method: options.method.toUpperCase(),
    success: res => {
      if (errorHandler(res)) {
        const { data, header, cookies } = res;
        if (success) success(data, header, cookies);
      }
    },
    fail: e => {
      if (fail) fail();
    },
    complete: res => {
      if (options.showLoading) Taro.hideLoading();
      if (options.complete) options.complete();
    }
  });
};

export function uploadFile(options, success, fail) {
  options = {
    name: "file",
    ...options
  };
  Taro.showLoading({
    title: "加载中..."
  });
  Taro.uploadFile({
    url: options.url,
    filePath: options.filePath,
    name: options.name,
    header: {
      Cookie: Taro.getStorageSync($CONSTANTS.COOKIE_NAME)
    },
    formData: options.data,
    success: res => {
      if (errorHandler(res)) {
        const data = JSON.parse(res.data);
        if (validate(data)) {
          if (success) success(data);
        }
      }
    },
    fail: e => {
      if (fail) fail();
    },
    complete: res => {
      Taro.hideLoading();
      if (options.complete) options.complete();
    }
  });
}

/**
 * 请求成功后的通用前处理
 * @param {*} res
 */
export function validate(res) {
  if (res == null) {
    return false;
  } else if (!res.success) {
    Taro.atMessage({
      message: res.msg ? res.msg : "操作失败。",
      type: "error"
    });
    return false;
  }
  return true;
}
