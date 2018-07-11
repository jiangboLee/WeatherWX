//207e4c3b38f969392aee546c3970007e
var network_util = require('../../utils/network.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistoryData();
  },

  getHistoryData: function() {
    var that = this;
<<<<<<< HEAD
    wx.showLoading({
      title: '正在加载中...',
    })
=======
>>>>>>> e1420e05b6db69cbddb8342300f59cebc1933ca1
    var url = "https://www.ljbniubi.top/wx/api/history"
    var data = {
      key: "207e4c3b38f969392aee546c3970007e",
      v: "1.0",
      month: new Date().getMonth(),
      day: new Date().getDay()
    }
    network_util._get(url, data, function (res) {
      console.log(res.data)
      that.setData({
        result: res.data
      })
    }, function (res) {

    }, function () {
<<<<<<< HEAD
      wx.hideLoading();
=======

>>>>>>> e1420e05b6db69cbddb8342300f59cebc1933ca1
    });
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
<<<<<<< HEAD
=======
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
>>>>>>> e1420e05b6db69cbddb8342300f59cebc1933ca1
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})