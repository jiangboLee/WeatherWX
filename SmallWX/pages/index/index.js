//获取应用实例

var network_util = require('../../utils/network.js');

const app = getApp()
var location;
var isOpenSetting = false;
Page({
  data: {
    location: '上海市',
    hasRefresh: false,
    nowTemperature: '0 ℃',
    nowWind: '晴/东北风  微风',
    nowAir: '50  优',
    hourlyArr: [],
    dailyForecast: [],
    lifeStyle: [],
  },
  gotest: function() {
    wx.navigateTo({
      url: '../scrollView/scrollView',
    })
  },
  //天气接口
  Weather: function(lat, longi) {
    var _this = this;
    //数据集合
    var url = "https://free-api.heweather.com/s6/weather";
    var airUrl = "https://free-api.heweather.com/s6/air";
    var data = {
      key: "bff5cc9bcfdf46b0a0e9bf0c260ff14f",
      location: longi ? longi + "," + lat : "shanghai",
      lang: "zh",
      unit: "m"
    };
    network_util._get(url, data, function (res) {
      console.log(res.data.HeWeather6[0])
      var now = res.data.HeWeather6[0].now;
      var hourly = res.data.HeWeather6[0].hourly;
      var daily = res.data.HeWeather6[0].daily_forecast;
      var lift = res.data.HeWeather6[0].lifestyle;
      _this.setData({
        nowTemperature: now.tmp + " ℃", 
        nowWind: now.cond_txt + "/" + now.wind_dir + "   " + now.wind_sc,
        hourlyArr: hourly,
        dailyForecast: daily,
        lifeStyle: [lift[2], lift[1], lift[6], lift[5]],
      })
    }, function (res) {

    }, function () {
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh();
      wx.hideLoading()
    });
    //空气质量请求
    network_util._get(airUrl, data, function(res) {
      console.log(res.data)
      var nowAirCity = res.data.HeWeather6[0].air_now_city;
      _this.setData({
        nowAir: nowAirCity.aqi + "  " + nowAirCity.qlty,
      })
    }, function(res) {

    }, function() {

    });
  },
  //地理反编码
  genCodeLocation: function(lat, longi) {
    var _this = this;
    var url = "https://restapi.amap.com/v3/geocode/regeo";
    var data = {
      key: "05e62c98ebc533cb8811ae71ca817033",
      location: longi + "," + lat
    }
    network_util._get(url, data, function (res) {
      console.log(res.data)
      _this.setData({
        location: res.data.regeocode.addressComponent.district + res.data.regeocode.addressComponent.township
      })
    }, function (res) {

    }, function () {
      location = "youzhi"
      _this.Weather(lat, longi)
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
      title: '及时天气',
      path: '/page/'
    }
  },
  refresh: function() {
    this.setData({
      hasRefresh: true,
      hehe: bbbb
    })
    
  },
  onPullDownRefresh: function() {
    this.Weather();
  }
})
