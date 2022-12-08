import Taro,{getCurrentInstance} from "@tarojs/taro";
import $CONSTANTS from "./constants";
import $request from "./request";
import $API from "../service/api";
import { validate } from "./request";

export default () => {
  Taro.login({
    success: res => {
      if (res.code) {
        console.log(res.code)
        $request(
          {
            url: $API.login,
            data: {code:res.code},
            method: "POST"
          },
          (res, header, cookies) => {
            if (validate(res)) {
              if (cookies && cookies.length > 0) {
                Taro.setStorageSync($CONSTANTS.COOKIE_NAME, cookies.join(';'));
                if(res.data){
                  Taro.setStorageSync($CONSTANTS.USER_INFO, res.data);
                }
                Taro.reLaunch({
                  url:'/pages/index/index'
                })
              }
            }
          }
        );
      }
    }
  });
};
