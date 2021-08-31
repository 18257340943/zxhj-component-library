/* eslint-disable camelcase */
/**
 * c_fetch
 * 基于原生fetch封装了拦截器功能，暴露出来的c_fetch跟原生fetch用法一致，只是增加了拦截器功能。拦截器用法参考axios的拦截器用法。
 * 拦截器: c_fetch.interceptors
 * 注意: 拦截器不拦截reject类型的response结果
 */

//定义用来存储拦截请求和拦截响应结果的处理函数集合
import { message } from 'antd';

let interceptors_req = [], interceptors_res = [];

function c_fetch({ input, init = {}, willRequest, willResponse }) {

  init = willRequest(init);
  //interceptors_req是拦截请求的拦截处理函数集合
  interceptors_req.forEach(interceptors => {
    init = interceptors(init);
  })

  //在原生fetch外面封装一个promise，为了在promise里面可以对fetch请求的结果做拦截处理。
  //同时，保证c_fetch函数返回的结果是个promise对象。
  return new Promise(function (resolve, reject) {
    //发起fetch请求，fetch请求的形参是接收上层函数的形参
    fetch(input, init)
      .then(res => {
        res = willResponse(res)
        //interceptors_res是拦截响应结果的拦截处理函数集合
        interceptors_res.forEach(interceptors => {
          //拦截器对响应结果做处理，把处理后的结果返回给响应结果。
          res = interceptors(res);
        });
        // 常规数据返回 res.json()
        if (res && Object.getPrototypeOf(res).constructor.name === "Response") {
          return res.json();
        }
        resolve(res);
      })
      .then(result => {
        const { data, code } = result;
        // 通过 code === 200? 认证直接报错
        if (code !== 200) {
          const errorMsg = data && data.message || "服务器异常！";
          message.error(errorMsg);
          reject(errorMsg);
          return;
        }
        // 部分接口通过data中的 succeed? 判断
        if (data && data.succeed === 0) {
          message.error(data && data.msg || "服务器异常！");
          return;
        }
        // 将拦截器处理后的响应结果resolve出去
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  })

}

c_fetch.interceptors = {
  request: {
    use: function (callback) {
      interceptors_req.push(callback);
    }
  },
  response: {
    use: function (callback) {
      interceptors_res.push(callback);
    }
  }
}

export default c_fetch;


