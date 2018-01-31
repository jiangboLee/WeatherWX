//index.js
//获取应用实例
const app = getApp()
var location;
var isOpenSetting = false;
Page({
  data: {
    motto: 'nihao',
    location: '上海市',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  gotest: function() {
    wx.navigateTo({
      url: '../scrollView/scrollView',
    })
  },

  //天气接口
  Weather: function(lat, longi) {
    var _this = this
    wx.request({
      // url: "https://api.seniverse.com/v3/weather/now.json",
      // data: {
      //   key: "ff8v8ynamw3oq3ax",
      //   location: location ? "" :"shanghai",
      //   language: "zh-Hans",
      //   unit: "c"
      // },
      //和风
      url: "https://free-api.heweather.com/s6/weather/now",
      data: {
        key: "bff5cc9bcfdf46b0a0e9bf0c260ff14f",
        location: location ? longi + "," + lat : "shanghai",
        lang: "en",
        unit: "m"
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
      },
      fail: function (err) {
        console.log(err)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  //地理反编码
  genCodeLocation: function(lat, longi) {
    var _this = this;
    wx.request({
      url: "https://restapi.amap.com/v3/geocode/regeo",
      data: {
        key: "05e62c98ebc533cb8811ae71ca817033",
        location: longi + "," + lat
      },
      metod: "GET",
      success: function(res) {
        console.log(res.data)
        _this.setData({
          location: res.data.regeocode.addressComponent.district + res.data.regeocode.addressComponent.township
        })
      },
      fail: function (err) {
        // console.log(err)
      },
      complete: function () {
        location = "youzhi"
        _this.Weather(lat, longi)
      }
    })
  },
  onLoad: function () {
    this.getLocationAction()
  },
  getLocationAction: function() {
    var location;
    var _this = this;
    wx.getLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        location = latitude + ":" + longitude
        console.log(res)
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        _this.genCodeLocation(latitude, longitude)
      },
      fail: function () {
        _this.Weather("", "");
      }
    }) 
  },
  onShow : function() {
    // if (isOpenSetting) {
    //   this.getLocationAction()
    // }
  },
  chooseLocation: function() {
      var isopenLoction;
      var _this = this;
      wx.getSetting({
        success: (res) => {
          console.log(res)
          isopenLoction = res.authSetting["scope.userLocation"]
          console.log(isopenLoction)
          if (isopenLoction) {
            wx.chooseLocation({
              success: function (res) {
                console.log(res)
                _this.setData({
                  location: res.address
                })
                location = res.latitude + ":" + res.longitude
                _this.Weather(res.latitude, res.longitude)
              },
            })
          } else {
            wx.showToast({
              title: '检测到您没获得位置权限，请先开启哦',
              icon: "none",
              duration: 3000
            })
            setTimeout(function () {
              //打开设置
              wx.openSetting({
                success: (res) => {
                  console.log(res)
                  isOpenSetting = res.authSetting["scope.userLocation"]
                  _this.getLocationAction()
                }
              })
            }, 3000)
          }
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
