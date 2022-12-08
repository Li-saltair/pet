export async function checkSubscribeAuth({tmplIds}){
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            withSubscriptions: true,
            success(successRes){
                let result = undefined
                //itemSettings 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息。
                if(successRes.subscriptionsSetting.itemSettings!=undefined){       //订阅消息['reject','accept']
                    result = successRes.subscriptionsSetting.itemSettings[tmplIds[0]]
                }
                if(result != 'reject'){     //只要不选择不再接受此类消息就可以发起订阅通知
                    console.log(tmplIds)
                    wx.requestSubscribeMessage({
                        tmplIds: tmplIds,
                        success (requestSubscribeRes) {
                            resolve(true)
                        }
                      })
                } else {
                    reject(false)
                }
            }
        })
    })
}