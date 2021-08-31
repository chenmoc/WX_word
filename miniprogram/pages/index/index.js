
//获取应用实例
var app = getApp()
var stuName = '';
var stuNum = '';
var pro = 0;
Page({
  data: {
    motto: 'Be water my friend.',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    wxTimerList: {}
  },

  
  inputName:function(e){
    console.log(e.detail.value);
    stuName = e.detail.value
  },

  inputNum:function(e){
    console.log(e.detail.value);
    stuNum = e.detail.value
  },

  leap: function(){
    console.log(stuName);
    console.log(stuNum);
    app.globalData.name = stuName;
    app.globalData.num = stuNum;
    wx.request({
      url: 'https://chenmoc.com/words/user.php',
      method: 'GET',
      header: {
        'content-type' : 'application/json'
      },
      data:{
        name: stuName,
        num: stuNum
      },
      success: function(res){
        // console.log(res);
        console.log(res.data);
        if(res.data.flag == 1){
          app.globalData.pro = res.data.isPro[0];
          console.log(app.globalData.pro);
               wx.redirectTo({
                url: '../T1/T1',
              })
        }
        else if(res.data.done == 1){
          wx.showModal({
            title: '提示',
            content: '你已参加过比赛，请勿重复参加',
            showCancel: false
          })
        }
        else{
          wx.showModal({
            title: '提示',
            content: '你输入信息有误或未报名比赛',
            showCancel: false
          })
        }
      }
    })
  },
  onLoad: function () {
    var that = this;
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  
})



 
