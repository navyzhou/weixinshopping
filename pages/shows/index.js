//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    cartnums: 1,
    home:'../../images/home.png',
    msg:'../../images/msg.png',
    contact: '../../images/contact.png',
    server:'../../images/server1.png',
    me:'../../images/me.png',
    banner_list:[
      {"pic_url": "/images/h_1.jpg"},
      {"pic_url": "/images/h_2.jpg"},
      {"pic_url": "/images/p_1.jpg"}
    ],
    goodlist:[
      {"gno": "1001", "pic_url": "/images/h_1.jpg", "gname":"华为X20发动机水电费", "price": 4680},
      {"gno": "1002", "pic_url": "/images/h_2.jpg", "gname":"华为X20", "price": 4680},
      {"gno": "1003", "pic_url": "/images/p_1.jpg", "gname":"苹果5S", "price": 4680},
      {"gno": "1004", "pic_url": "/images/h_2.jpg", "gname":"华为X20", "price": 4680},
      {"gno": "1005", "pic_url": "/images/p_1.jpg", "gname":"苹果5S", "price": 4680},
      {"gno": "1006", "pic_url": "/images/h_2.jpg", "gname":"华为X20", "price": 4680},
      {"gno": "1007", "pic_url": "/images/p_1.jpg", "gname":"苹果5S", "price": 4680}
    ],
    multiIndex: 0,
    multiArray: [['白色', '黑色', '黄色'], ['4G', '6G', '8G', '12G', '16G'], ['32G', '64G', '128G']],

    chooseShadow: false,
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
  },

  // 显示遮罩层
  showshadow:function(e){
    if (this.data.chooseShadow == false) {
      this.chooseSezi()
    } else {
      this.hideModal()
    }
  },
  // 动画函数
  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 200,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(500).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseShadow: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动 滑动时间
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        clearcart: false
      })
    }, 100)
  },
  // 隐藏
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(500).step()
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseShadow: false
      })
    }, 100)
  }
})
