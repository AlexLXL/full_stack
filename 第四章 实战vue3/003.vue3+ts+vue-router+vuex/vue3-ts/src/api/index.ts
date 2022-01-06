import request from "./ajax";
const index = new request({
    baseURL:'http://42.193.158.170:8098',
    timeout:10000
})
export default index;