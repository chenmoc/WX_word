const wxTimer = require('../../plugins/wxTimer.js');
var app = getApp();
var selected = "";
var times = 0;
var scores = 0;
var i = 0;
var flag=1;
var tcount=0;
var ct = 0;
var correct = new Array();
var Timer = new wxTimer({
  beginTime: "00:01:40",
  complete: function(){
    app.globalData.sumScores = scores;
    app.globalData.correctA = correct;
    wx.showModal({
      title: '提示',
      content: '第一部分得分为：'+ scores + ',共答对了' + ct + '题',
      showCancel: false,
      success: function(res){
          wx.redirectTo({
            url: '../T2/T2',
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
    items: [
      {name: ''},
      {name: ''},
      {name: ''},
      {name: ''},
      
    ],
    trans: [
    
    ],
    ans: [

    ],
    counts: 0,
    pro: 0
  },
  radioChange: function(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value);
    selected = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  sure: function(e){
    if(selected == ''){
      wx.showModal({
        title: '提示',
        content: '您未选择任何选项，请选择',
        showCancel: false
      })
      return ;
    }
    times++;
    if(selected.trim() == this.data.ans.trim()){
      wx.showToast({

        title: '这一题你答对了',
   
        icon: 'success',
   
        duration: 100//持续的时间
   
      })
      ct++;
      scores+=2;
      if(times == this.data.counts){
         console.log(correct);
        app.globalData.sumScores = scores;
        Timer.stop(this);
        app.globalData.correctA = correct;
        console.log(app.globalData.correctA);
        wx.showModal({
          title: '提示',
          content:'第一部分得分为：'+ scores ,
          showCancel: false,
          success: function(res){
              wx.redirectTo({
                url: '../T2/T2',
              })
          }
        })
      }
     
    }
    else{
      correct.push(this.data.trans+'-'+this.data.ans+' ');
      if(times == this.data.counts){
        console.log(correct);
        app.globalData.sumScores = scores;
        Timer.stop(this);
        app.globalData.correctA = correct;
        console.log(app.globalData.correctA);
        wx.showModal({
          title: '提示',
          content: '第一部分得分为：'+ scores ,
          showCancel: false,
          success: function(res){
              wx.redirectTo({
                url: '../T2/T2',
              })
          }
        })
      }
     
    }
    if(times < this.data.counts){
    var me = this;
      tcount++;
         me.setData({
            'items[0].name': me.data.arr[tcount].optionA,
            'items[1].name': me.data.arr[tcount].optionB,
            'items[2].name': me.data.arr[tcount].optionC,
            'items[3].name': me.data.arr[tcount].optionD,
            trans:me.data.arr[tcount].trans,
            ans: me.data.arr[tcount].ans
          })
  selected = '';
    }
  },
  onLoad: function (options) {
    var me = this;
    Timer.start(me);
    // console.log(app.globalData.pro);
      wx.request({
        url: 'https://chenmoc.com/words/rushA.php',
        method: 'GET',
        header: {
          'content-type' : 'application/json'
        },
        data:{
          pro: app.globalData.pro
        },
        success: function(res){
          // console.log(res.data);
          me.setData({
            arr: res.data.test,
            'items[0].name': res.data.test[tcount].optionA,
            'items[1].name': res.data.test[tcount].optionB,
            'items[2].name': res.data.test[tcount].optionC,
            'items[3].name': res.data.test[tcount].optionD,
            trans: res.data.test[tcount].trans,
            ans: res.data.test[tcount].ans,
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
        pro: app.globalData.pro
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
   
  },
})