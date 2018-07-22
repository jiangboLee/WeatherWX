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
    wx.showLoading({
      title: '正在加载中...',
    })
    var url = "https://www.ljbniubi.top/wx/api/history"
    var data = {
      key: "207e4c3b38f969392aee546c3970007e",
      v: "1.0",
      month: (new Date()).getMonth() + 1,
      day: (new Date()).getDate()
    }
    // console.log(data)
    network_util._get(url, data, function (res) {
      console.log(res.data)
      that.setData({
        result: res.data
      })
    }, function (res) {
      wx.showModal({
        title: 'sorry',
        content: '网络出错啦~',
      })
    }, function () {
      wx.hideLoading();
    });
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  onShareAppMessage: function () {
    
  }
})