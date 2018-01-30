//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'nihao',
    location: '上海',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  Weather: function() {
    var _this = this
    wx.request({
      url: "https://api.seniverse.com/v3/weather/now.json",
      data: {
        key: "ff8v8ynamw3oq3ax",
        location: "shanghai",
        language: "zh-Hans",
        unit: "c"
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        _this.setData({
          location: "haha"
        })
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  onLoad: function () {
    var location;
    var _this = this;
    wx.getLocation({
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        location = latitude + ":" + longitude
        console.log(res)
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        _this.Weather();
      },
      fail: function() {
        wx.showToast({
          title: '检测到您没获得位置权限，请先开启再来哦',
          icon: "none",
          duration: 3000    
        })
        setTimeout(function () {
          // wx.hideToast()
          wx.showLoading({
            title: '加载中',
            mask: true
          })
          _this.Weather();
        }, 3000)
      }
    }) 
  },
  onShareAppMessage: function () {
    return {
      title: '天气',
      path: '/page/'
    }
  }
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
