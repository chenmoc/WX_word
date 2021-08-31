const wxTimer = require('../../plugins/wxTimer.js')
var app = getApp();
var hadInput = '';
var times = 0;
var i=0;
var tempScores = 0;
var stuName = '';
var stuNum = '';
var tcount=0;
var correct = new Array();
var Timer = new wxTimer({
  beginTime: "00:01:40",
  complete: function(){
    app.globalData.correctC = correct;
    wx.request({
      url: 'https://chenmoc.com/words/updateStatus.php',
      method: 'GET',
      header: {
        'content-type' : 'application/json'
      },
      data:{
        name: stuName,
        num: stuNum,
        allScores: tempScores,
      },
      success: function(res){
        console.log(res.data);
      }
    })
    wx.showModal({
      title: '提示',
      content: '你的最终得分为：'+ tempScores,
      showCancel: false,
      success: function(res){
       wx.redirectTo({
         url: '../final/final',
       })
    }
    })
  }
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxTimerList: {},
     arr:[],
     tips:[

     ],
     ans:[

     ],
     name: '',
     num: '',
     scores: 0,
     counts: 0,
     empty: ''
  },

  // bindInput:function(e){
  //   hadInput = e.detail.value
  // },

  sub:function(e){
     hadInput = e.detail.value.userAns;
     console.log(hadInput);
      if(hadInput.trim() == ''){
        wx.showModal({
          title: '提示',
          content: '未输入任何内容',
          showCancel: false
        })
        return;
      }
      times++;
      console.log(hadInput);
      if(hadInput.trim() == this.data.ans.trim()){
        this.data.scores+=2;
        tempScores = this.data.scores;
        if(times == this.data.counts){
          app.globalData.correctC = correct;
          Timer.stop(this);
          wx.request({
            url: 'https://chenmoc.com/words/updateStatus.php',
            method: 'GET',
            header: {
              'content-type' : 'application/json'
            },
            data:{
              name: stuName,
              num: stuNum,
              allScores: tempScores,
            },
            success: function(res){
              console.log(res.data);
            }
          })
          wx.showModal({
            title: '提示',
            content: '你的最终得分为：'+ this.data.scores,
            showCancel: false,
            success: function(res){
             wx.redirectTo({
               url: '../final/final',
             })
          }
          })
        }
      }
      else{
        correct.push(this.data.tips+'答案：'+this.data.ans);
        if(times == this.data.counts){
          Timer.stop(this);
          app.globalData.correctC = correct;
          wx.request({
            url: 'https://chenmoc.com/words/updateStatus.php',
            method: 'GET',
            header: {
              'content-type' : 'application/json'
            },
            data:{
              name: stuName,
              num: stuNum,
              allScores: tempScores,
            },
            success: function(res){
              console.log(res.data);
            }
          })
          wx.showModal({
            title: '提示',
            content: '你的最终得分为：'+ this.data.scores,
            showCancel: false,
            success: function(res){
              wx.redirectTo({
                url: '../final/final',
              })
          }
          })
        }
      }
      i++;
      this.setData({
        empty: ''
      })
      hadInput = '';
      if(times < this.data.counts){
        var me = this;
        tcount++;
              me.setData({
                tips: me.data.arr[tcount].tips,
                ans: me.data.arr[tcount].ans,
              })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    Timer.start(me);
    wx.request({
      url: 'https://chenmoc.com/words/rushC.php',
      method: 'POST',
      header: {
        'content-type' : 'application/json'
      },
      data:{
        pro:app.globalData.pro
      },
      success:function(res){
          console.log(res.data);
          me.setData({
            arr:res.data.test,
            tips: res.data.test[tcount].tips,
            ans: res.data.test[tcount].ans,
            counts: res.data.count,
          })
      }
    })
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
    if(wx.canIUse('hideHomeButton')){

      wx.hideHomeButton()
      
      }
    this.setData({
      scores: app.globalData.sumScores,
    })
    tempScores = app.globalData.sumScores;
    stuName = app.globalData.name;
    stuNum = app.globalData.num;
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

  }
})