//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tips:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
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
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  userLogin:function(){
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/weixin/user',
      data: { op:"login", uname: this.data.account, pwd: this.data.pwd },
      method: 'POST', 
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (res.statusCode == 200) {
          if(res.data == 1) {
            wx.navigateTo({
              url: '../back/back'
            })
          } else {
            that.setData({
              tips: "账号或密码错误..."
            })
          }
        } else {
          that.setData({
            tips: "登陆失败，请稍后重试..."
          })
        }
      },
      fail: function () {
        that.setData({
          tips: "登陆失败，请稍后重试..."
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
  userBack:function(e) {
    wx: wx.redirectTo({
      url: '../index/index'
    })
  },
  accountFocus:function(e){
    this.setData({
      tips: ""
    })
  },
  pwdFocus: function (e) {
    this.setData({
      tips: ""
    })
  }
})
