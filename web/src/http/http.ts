import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:3000/';

// 请求拦截
axios.interceptors.request.use((config: AxiosRequestConfig | any) => config)

// 响应拦截
axios.interceptors.response.use((res: AxiosResponse) => {
  return res
}, err => {
  return Promise.reject(err)
});


interface IHttp {
  requestGET<T>(method: string, url: string, params: any): Promise<T>;
  requestPOST<T>(method: string, url: string, data: any): Promise<T>;

}

const http: IHttp = {
  requestGET: (method, url, params) =>
    axios({
      method,
      url,
      params
    }),
  requestPOST: (method, url, data) =>
    axios({
      method,
      url,
      data
    }),

}

export default http
