import axios from "axios";

// // 第一种方式
// export function request(config, success, failure) {
//   // 1.创建axios实例
//   const instance = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//
//   // 发送真正的网络请求
//   instance(config)
//     .then(res => {
//       success(res)
//     })
//     .catch(err => {
//       failure(err)
//     })
// }

// // 第二种方式
// export function request(config) {
//   // 1.创建axios实例
//   const instance = axios.create({
//     baseURL: "http://123.207.32.32:8000",
//     timeout: 5000
//   });
//
//   instance(config.baseConfig)
//     .then(res => {
//       config.success(res);
//     })
//     .catch(err => {
//       config.failure(err);
//     });
// }

// 第三种方式
// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: "http://123.207.32.32:8000",
//       timeout: 5000
//     });
//
//     instance(config)
//       .then(res => {
//         resolve(res);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// }

// 第四种方式--使用这种方式最好
// axios本身返回一个Promise对象，所以可以直接返回
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: "http://123.207.32.32:8000",
    timeout: 5000
  });
  // 2.axios的拦截器;
  // 请求拦截;
  instance.interceptors.request.use(
    // 这里拦截的是config，与变量名无关
    config => {
      // 拦截config后需要将config返回，否则会引发请求失败
      return config;
    },
    error => {
      console.log(error);
    }
  );

  // 响应拦截：
  instance.interceptors.response.use(
    res => {
      if(res.status === 204 || res.status === 400){
        return false
      }
      else {
        return res.data;
      }
    },
    error => {
      console.log(error);
    }
  );
  // 3.发送真正的网络请求
  return instance(config);
}
