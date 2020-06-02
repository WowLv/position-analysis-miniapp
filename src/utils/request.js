let ajaxTimes = 0
const request = (params) => {
    ajaxTimes ++
    wx.showLoading({
        title: '加载中',
        mask: true
      })

    const baseUrl = "http://localhost:3000"
    return new Promise((resolve, reject) => {
        uni.request({
            ...params,
            url: baseUrl+params.url,
            success: (res) => {
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                ajaxTimes --
                if(ajaxTimes === 0) {
                    uni.hideLoading()
                } 
            }
        })
    })
}

export default request
