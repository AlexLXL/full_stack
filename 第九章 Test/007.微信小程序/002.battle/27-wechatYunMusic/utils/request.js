// 发送ajax请求
import config from '../utils/config'

export default (url, data = {}, method = 'GET') => {
  return new Promise((resolve, reject) => {
    //初始化promise实例的状态为pending
    wx.request({
      url: config.host + url,//请求地址
      data: data,//请求参数对象
      method: method,//请求方法
      header: {
        cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''
      },

      success: (res) => {
        if (data.isLogin) {//登录请求,将用户cookie存入
          wx.setStorage({
            key: 'cookies',
            data: res.cookies,
          })
        }

        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}