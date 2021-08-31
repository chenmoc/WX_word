// pages/second/second.js
const wxTimer = require('../../plugins/wxTimer.js')
var app = getApp();
var hadInput = "";
var times =0;
var i=0;
var s2 = 0;
var tempScores = 0;
var tcount = 0;
var correct = new Array();
var Timer = new wxTimer({
  beginTime: "00:02:30",
  complete: function(){
    app.globalData.sumScores = tempScores;
    app.globalData.correctB = correct;
    wx.showModal({
      title: '提示',
      content: '第二部分得分为：'+ s2,
      success: function(res){
       wx.redirectTo({
         url: '../T3/T3',
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
    source:[

    ],
    sourceDes:[

    ],
    destination:[

    ],
    destinationDes:[

    ],
    counts: 0,
    sumScores: 0,
    empty: '',
    correct: new Array()
  },

// bindInput:function(e){
//   hadInput = e.detail.value
// },

sub:function(e){
  hadInput = e.detail.value.userAns;
    console.log(hadInput);
    if(hadInput.trim() == ''){
      wx.showModal({
        title:'提示',
        content:'未输入任何内容',
        showCancel: false
      })
      return;
    }
    times++;
    if(hadInput.trim() == this.data.destination.trim()){
      this.data.sumScores+=2;
      tempScores = this.data.sumScores;
      s2++;
      if(times == this.data.counts){
        app.globalData.sumScores = this.data.sumScores;
        app.globalData.correctB = correct;
        Timer.stop(this);
        wx.showModal({
          title: '提示',
          content: '第二部分得分为：'+ s2,
          showCancel: false,
          success: function(res){
           wx.redirectTo({
             url: '../T3/T3',
           })
        }
        })
      }
    }
    else{
      correct.push(this.data.source+'('+this.data.sourceDes+')'+'答案：'+this.data.destination+'('+this.data.destinationDes+')');
      if(times == this.data.counts){
        app.globalData.sumScores = this.data.sumScores;
        app.globalData.correctB = correct;
        Timer.stop(this);
        wx.showModal({
          title: '提示',
          content: '第二部分得分为：'+ s2,
          showCancel: false,
          success: function(res){
            wx.redirectTo({
              url: '../T3/T3',
            })
        }
        })
      }
    }
    this.setData({
      empty: '',
    }),
    i++;
    if(times < this.data.counts){
      var me = this;
      tcount++;
    me.setData({
              source:me.data.arr[tcount].source,
              sourceDes:me.data.arr[tcount].SD,
              destination:me.data.arr[tcount].ans,
              destinationDes:me.data.arr[tcount].AD,
            })
  }
  hadInput = '';
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    Timer.start(me);
    console.log(app.globalData.correctA);
    wx.request({
      url: 'https://chenmoc.com/words/rushB.php',
      method: 'GET',
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
            source:res.data.test[tcount].source,
            sourceDes:res.data.test[tcount].SD,
            destination:res.data.test[tcount].ans,
            destinationDes:res.data.test[tcount].AD,
            counts: res.data.counts
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
      sumScores: app.globalData.sumScores
    })
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