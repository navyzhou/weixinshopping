//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  userReg: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/weixin/user?op=reg',
      data: { uname: this.data.account, pwd: this.data.pwd, usid: this.data.userInfo.nickName, phone:this.data.phone },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data == 1) {
            wx.showToast({
              title: '成功,请登录',
              icon: 'success',
              duration: 2000
            });
            setTimeout(function () {
              wx: wx.redirectTo({
                url: '../login/login'
              })
            }, 2000)
          } else {
            that.setData({
              tips: "注册失败..."
            })
          }
        } else {
          that.setData({
            tips: "注册失败，请稍后重试..."
          })
        }
      },
      fail: function () {
        that.setData({
          tips: "注册失败，请稍后重试..."
        })
      }
    })
  },
  accountInput: function (e) {
    this.setData({
      account: e.detail.value
    })
  },
  pwdInput: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  }, 
  userBack: function (e) {
    wx: wx.redirectTo({
      url: '../index/index'
    })
  }
})
