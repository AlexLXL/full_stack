// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],//导航标签
    navId: '',//导航标识
    videoList: [],//视频
    videoId: '',//视频id标识
    videoUpdateTime: [],//记录播放时长
    isTriggered: false,//表示下拉刷新
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData();
  },
  
  //获取导航数据
  async getVideoGroupListData(){
    let videoGroupListData = await request('/video/group/list');
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0,20),
      navId: videoGroupListData.data[0].id
    })
    this.getVideoList(this.data.navId);
  },

  //点击切换导航的回调
  changeNav(event){
    let navId = event.currentTarget.id;//通过id向event事件传参，传的数字会转为string
    this.setData({
      navId: navId>>>0,
      videoList: []
    })

    //显示正在加载
    wx.showLoading({
      title: '正在加载',
    })
    //动态获取当前导航的动态数据
    this.getVideoList(this.data.navId);
  },

  //获取视频列表数据
  async getVideoList(navId){
    if(!navId){
      return;
    }
    let VideoListData = await request('/video/group',{id: navId});
    if(VideoListData.datas.length === 0){
      wx.showToast({
        title: '暂无推荐视频',
        icon: 'none'
      })
      return;
    }
    //关闭加载提示
    wx.hideLoading();
    
    let index = 0;
    let videoList = VideoListData.datas.map(item => {
      item.id = index++;
      return item;
    })
    this.setData({
      videoList: videoList,
      //关闭下拉刷新
      isTriggered: false
    })
  },

  //点击播放回调
  handlePlay(event){
    //播放新视频之前找到上一个正在播放的视频并关闭
    let vid = event.currentTarget.id;
    //怎样关闭上一个视频？找到上一个视频的实例
    //如何确认点击播放的视频与正在播放的视频不是同一个(通过vid的对比)
    //this.vid !==vid && this.videoContext && this.videoContext.stop();
    
    //this.vid = vid;

    this.setData({
      videoId: vid
    })

    //创建控制video的实例对象
    this.videoContext = wx.createVideoContext(vid);
    //判断当前的视频是否播放过，有播放记录，有则跳转到之上次播放的位置
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid === vid);
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime);
    }

    //this.videoContext.play();
  },

  //监听视频播放进度
  handleTimeUpdate(event){
    let videoTimeObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime};
    let {videoUpdateTime} = this.data;

    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);
    //如果数组中有当前视频对应的时间就更新，没有则添加
    if(videoItem){
      videoItem.currentTime = videoTimeObj.currentTime;
    }else{
      videoUpdateTime.push(videoTimeObj);
    }
    //更新
    this.setData({
      videoUpdateTime: videoUpdateTime
    })
  },

  //视频播放结束调用
  handleEnded(event){
    //移除播放时长数组中以结束的视频
    let {videoUpdateTime} = this.data;
    
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id),1);
    this.setData({
      videoUpdateTime: videoUpdateTime
    })
  },
  //自定义下拉刷新
  handleRefresher(){
    this.getVideoList(this.data.navId);
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
    this.getVideoList(this.data.navId);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({from}) {
    return {
      title: '来自manster云音乐的转发'
    }
  }
})