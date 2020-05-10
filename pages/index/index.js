Page({
  data: { },
  userLogin: function () {
   wx:wx.redirectTo({
     url: '../login/login'
   })
  },
  userReg: function (e) {
    wx: wx.redirectTo({
      url: '../reg/reg'
    })
  }
})
