import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ElMessage} from "element-plus";
import {getToken} from "@/utils/auth";
import qs from 'qs'

export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}

enum StatusCode {
  NoAuth = 600, //token失效
  Success = 200 //返回成功
}

class Request {
  private axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // 创建axios实例
    this.axiosInstance = axios.create(config)
    // axios默认配置
    this.defaults()
    // axios拦截器
    this.interceptors()
  }

  private defaults() {
    this.axiosInstance.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
    this.axiosInstance.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'
    // this.axiosInstance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    this.axiosInstance.defaults.responseType = 'json'
    this.axiosInstance.defaults.transformRequest = [
      (params) => qs.stringify(params, {indices: false})
    ]
  }

  //axios拦截器
  private interceptors() {
    // 请求发送之前拦截
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      let token = getToken() || '';
      if (token) {
        //把token添加到请求头部
        config.headers = {
          token: token
        };
      }
      //这里可以设置头部token携带到后端进行token的验证
      return config
    }, (error) => {
      // 错误抛到业务代码
      error.data = {}
      error.data.msg = '服务器异常，请联系管理员！'
      return error
    })

    /**
     * 请求返回之后拦截
     * res的类型是AxiosResponse<any>
     */
    this.axiosInstance.interceptors.response.use((res: AxiosResponse) => {
      if (res && res.data) {
        const data = res.data as any;
        if (data.code == StatusCode.NoAuth) {
          //清空sessionStorage数据
          sessionStorage.clear();
          //跳到登录
          window.location.href = "/login";
          // return res;
        } else if (data.code == StatusCode.Success || res.config.responseType === "arraybuffer") {
          return res;
        } else {
          ElMessage.error(data.msg || '服务器出错!')
          return res || null // 返回数据
        }
      }

    }, (error) => { // 这里是遇到报错的回调
      console.log('进入错误')
      error.data = {};
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.data.msg = '错误请求';
            ElMessage.error(error.data.msg)
            break
          case 401:
            error.data.msg = '未授权，请重新登录';
            ElMessage.error(error.data.msg)
            break
          case 403:
            error.data.msg = '拒绝访问';
            ElMessage.error(error.data.msg)
            break
          case 404:
            error.data.msg = '请求错误,未找到该资源';
            ElMessage.error(error.data.msg)
            break
          case 405:
            error.data.msg = '请求方法未允许';
            ElMessage.error(error.data.msg)
            break
          case 408:
            error.data.msg = '请求超时';
            ElMessage.error(error.data.msg)
            break
          case 500:
            error.data.msg = '服务器端出错';
            ElMessage.error(error.data.msg)
            break
          case 501:
            error.data.msg = '网络未实现';
            ElMessage.error(error.data.msg)
            break
          case 502:
            error.data.msg = '网络错误';
            ElMessage.error(error.data.msg)
            break
          case 503:
            error.data.msg = '服务不可用';
            ElMessage.error(error.data.msg)
            break
          case 504:
            error.data.msg = '网络超时';
            ElMessage.error(error.data.msg)
            break
          case 505:
            error.data.msg = 'http版本不支持该请求';
            ElMessage.error(error.data.msg)
            break
          default:
            error.data.msg = `连接错误${error.response.status}`;
            ElMessage.error(error.data.msg)
        }
      } else {
        error.data.msg = "连接到服务器失败";
        ElMessage.error(error.data.msg)
      }
      return error
    })
  }

  /**
   * http://localhost:8089/api/user/getUserById?userId=10
   * @param url   /api/user/getUserById
   * @param params  {userId:10}
   * @returns
   */
  get<T = any>(url: string, params?: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.get<T>(url, params).then((res) => {
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  /**
   * http://localhost:8089/api/user/getUserById/10
   * @param url   /api/user/getUserById
   * @param params  {userId:10}
   * @returns
   */
  getRestApi<T = any>(url: string, params?: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.get<T>(this.getParams(params) ? `${url}/${this.getParams(params)}` : url)
        .then((res) => {
          resolve(res.data as any)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getParams(params: any): string {
    let _params = "";
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key]) {
          _params += `${params[key]}/`
        }
      }
    }
    //去掉参数最后一位/
    if (_params) _params = _params.slice(0, _params.length - 1);
    return _params;
  }

  post<T = any>(url: string, params: any, config: AxiosRequestConfig = {}): Promise<Result<T>> {
    let defaultConfig = {
      headers: {'Content-Type': 'application/json'}
    }
    config = Object.assign(defaultConfig, config)
    return new Promise((resolve, reject) => {
      this.axiosInstance.post<T>(url, params, config).then((res) => {
        resolve(res as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  put<T = any>(url: string, params: any, config: AxiosRequestConfig = {}): Promise<Result<T>> {
    let defaultConfig = {
      headers: {'Content-Type': 'application/json'}
    }
    config = Object.assign(defaultConfig, config)
    return new Promise((resolve, reject) => {
      this.axiosInstance.put<T>(url, params, config).then((res) => {
        resolve(res as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  delete<T = any>(url: string, params: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.delete<T>(this.getParams(params) ? `${url}/${this.getParams(params)}` : url)
        .then((res) => {
          resolve(res as any)
        }).catch((error) => {
        reject(error)
      })
    })
  }

  /**
   * 获取图片（验证码）
   * @param url
   */
  getImage(url: string) {
    return this.axiosInstance.post(url, null, {
      responseType: 'arraybuffer'
    })
  }

  /**
   * 单例模式
   * @private
   */
  private static instance: Request;

  public static getInstance(config: AxiosRequestConfig) {
    if (!Request.instance) {
      Request.instance = new Request(config)
    }
    return Request.instance
  }
}

export default Request;