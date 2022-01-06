// import Request from "./ajax";
// const http = new request({
//     baseURL:'http://42.193.158.170:8098',
//     timeout: 10000
// })
// export default http;

// 单例模式
import Request from "./ajax";
const http = Request.getInstance({
  baseURL: 'http://42.193.158.170:8098',
  timeout: 10000
})
export default http;