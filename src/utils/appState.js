/* eslint-disable camelcase */  // 允许使用_下划线命名形式

import loadingPage from "../components/loadingPage";
import cookie from "./cookie";
import { search, removeEmptyField } from "./utils";
import initEnv from "./initEnv";
import c_fetch from "./c_fetch";

const { getCookie } = cookie;
const { baseUrl } = initEnv;

// 支持 search 参数url化,并且将 search 参数删除
function addSearch(url, init) {
  // eslint-disable-next-line no-unused-expressions
  init &&
    Object.keys(init).forEach(key => {
      if (key === "search") {
        let searchObj = init[key];
        if (!searchObj) {
          throw Error("类型", "search对象传入值不能为null等");
        }
        searchObj = removeEmptyField(searchObj);
        const searchUrl = search(searchObj);
        url += searchUrl;
        delete init[key];
      }
    });
  return {
    newURL: url,
    newINIT: init,
  };
}
// 为baseUrl 添加 pathUrl
function addPathUrl(baseUrl, url) {
  let newURL = '';
  if (typeof url === "string") {
    newURL = baseUrl + url;
    return newURL;
  }

}
// 部分业务支持重写 url
function initUrl(url, init) {
  let newURL = url;
  if (Object.hasOwnProperty.call(init, 'initUrl')) {
    newURL = init.initUrl
    return newURL
  }
  return newURL
}

// 经实例化以后可直接调用 appState.uploadFile() | appState.fetch()
class AppState {
  // formData 命名对象， 
  // formData 数据类型；
  // object形式；
  // 字符串
  //  或者 undefined 

  // 直接return  formData 数据类型 || 字符串 || undefined 
  static updateBody(body, formData) {
    formData = formData && { ...formData };

    if (body && Object.getPrototypeOf(body).constructor.name !== "FormData" && JSON.stringify(body) === '{}'  ) {
      return
    }

    if (!body && !formData) {
      return body
    }

    // body为 FormData类型 || 字符串
    if ((body && Object.getPrototypeOf(body).constructor.name === "FormData") || typeof body === "string") {
      console.log( body,'body');
      return body
    }

    if (typeof body === "object") {
      return JSON.stringify(body)
    }

    // 处理FormData数据
    if (typeof formData === 'object') {
      const _formData = new FormData();
      formData = removeEmptyField(formData);
      Object.keys(formData).forEach(key => {
        _formData.append(key, formData[key]);
      });
      return _formData
    }
  }

  static updateHeader(body, headers, formData) {
    headers = headers && { ...headers };
    const loginToken = getCookie(initEnv.cookieName);
    // 初始化默认头部
    const defaultHeaders = new Headers({
      "Content-Type": "application/json",
      ...removeEmptyField(headers),
    });
    // 假如body类型为FormData,则header头部删除Content-type，改为自适应
    if ((body && Object.getPrototypeOf(body).constructor.name === "FormData") || typeof formData === "object") {
      defaultHeaders.delete("Content-Type");
    }
    // 请求前拦截，用户登录情况下写入请求头token
    if (loginToken && loginToken !== "undefined") {
      defaultHeaders.append("Authorization", `Bearer ${loginToken}`);
    }

    return defaultHeaders
  }

  constructor() {
    this.isGetLoading = true;
    // this._fetch = _fetch();
    this.baseUrl = baseUrl;
  }

  // 私有属性代表appState 默认拦截处理
  #willRequest = (config) => {
    let { body, headers, formData } = config;
    // fetch默认请求方式设为 POST
    if (!config.method) { config.method = "POST" }
    // 默认 GET 请求打开
    if (this.isGetLoading) { loadingPage.start() }

    const newHeader = AppState.updateHeader(body, headers, formData);
    const newBody = AppState.updateBody(body, formData);
    // console.log(newBody, 'newBody');
    formData && delete config.formData;
    return ({
      ...config,
      headers: newHeader,
      body: newBody,
    });
  }

  #willResponse = (response) => {
    loadingPage.end();
    // OSS 签名认证特殊处理
    const ossUrl = "http://cdn-oss-data-zxhj.oss-cn-zhangjiakou.aliyuncs.com/";
    // 批量导出 contentType为ms-excel类型
    const isXls = response.headers.get('content-type') && response.headers.get('content-type').indexOf("application/vnd.ms-excel") > -1;
    if (response.url === ossUrl && response.status === 200) {
      return { code: 200 };
    }
    // 确认返回类型是 xls 表格系列
    if (isXls) {
      return response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let disposition = response.headers.get('Content-Disposition');
        let filename = disposition ? disposition.split("=")[1] : '';
        if (filename) {
          filename = decodeURIComponent(filename);
        }
        let a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        return { code: 200, data: true };
      });
    }
    return response
  }

  // 针对请求路径和配置做进一步处理啊
  #updateUrl(url, init) {
    url = addPathUrl(this.baseUrl, url);
    url = initUrl(url, init);
    const { newURL, newINIT } = addSearch(url, init);
    return { newURL, newINIT };
  }

  #getOSS() {
    return this.fetch('/upload/uploadPolicy', {
      method: "GET"
    })
  }

  // 新增文件上传通用服务
  uploadFile(info = {}) {
    const { file } = info;
    const { size, name } = file;
    const unOssFileMaxSize = 5 * 1024 * 1024;   // 精确到字节 默认最大 5MB
    return new Promise((resolve) => {
      if (size < unOssFileMaxSize) {
        const formData = new FormData();
        formData.append('file', info.file);
        this.fetch('/upload', {
          body: formData,
        }).then(data => {
          const { link } = data;
          resolve({ link });
        })
      } else {
        this.#getOSS().then(data => {
          const { accessid, cdnPath, dir, host, policy, signature } = data;
          const ossFormData = new FormData();
          ossFormData.append('key', `${dir}${name}`); //存储在oss的文件路径
          ossFormData.append('policy', policy); //policy
          ossFormData.append('OSSAccessKeyId', accessid); //accessKeyId
          ossFormData.append('success_action_status', "200"); //成功后返回的操作码
          ossFormData.append('signature', signature); //签名
          ossFormData.append("file", file);
          this.fetch(host, {
            initUrl: host,
            method: 'POST',
            body: ossFormData
          }).then(data => {
            resolve({
              link: cdnPath + name
            })
          })
        })
      }
    })
  }

  // 通用请求
  fetch(url, init) {
    let { newURL, newINIT } = this.#updateUrl(url, init);
    // console.log(newURL, newINIT, 'newURL ,newINIT');
    return c_fetch({
      input: newURL,
      init: newINIT,
      willRequest: this.#willRequest,
      willResponse: this.#willResponse
    });
  }

  requestIntercept(callback) {
    c_fetch.interceptors.request.use(callback);
  }

  responseIntercept(callback) {
    c_fetch.interceptors.response.use(callback)
  }

}


export default AppState;

