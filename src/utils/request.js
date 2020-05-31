var Fly=require("flyio/dist/npm/wx") 
var fly = new Fly
fly.config.timeout = 30000;
//设置请求基地址
fly.config.baseURL = './mock'

fly.interceptors.response.use((response) => {
    const res = response.data
        if (res.code !== 200) {
            return Promise.reject(new Error(res.msg))
        } else {
            return res
        }
}, (error) => {
    return Promise.reject(error)
})


    // return new Promise((resolve, reject) => {
    //     uni.request({
    //         ...params,
    //         url: baseUrl+params.url,
    //         success: (res) => {
    //             resolve(res.data)
    //         },
    //         fail: (err) => {
    //             reject(err)
    //         },
    //         complete: () => {
    //             ajaxTimes --
    //             if(ajaxTimes === 0) {
    //                 uni.hideLoading()
    //             } 
    //         }
    //     })
    // })

export default fly
