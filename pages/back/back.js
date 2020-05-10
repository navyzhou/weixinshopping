Page({
  data: { },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/weixin/user',
      data: { op: "findAll"},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            list_data:res.data.list
          })
        } 
      }
    })
  },
})
