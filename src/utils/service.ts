
// 跨域处理 参考地址：https://blog.csdn.net/z18237613052/article/details/126030867
import axios from "axios";
//这是使用代理的路径(如果没有跨域,在这里写全就可以)
//例如  https://cnodejs.org/api/v1
let baseUrl = '/api-elm'

// 创建axios实例，在这里可以设置请求的默认配置
const instance = axios.create({
    timeout: 10000, // 设置超时时间10s
    baseURL: baseUrl // 根据自己配置的反向代理去设置不同环境的baseUrl
})
// 文档中的统一设置请求头。
instance.defaults.headers.post['Content-Type'] = 'application/json'

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
    //var token = cookie.load('token')//获取本地存储的token
    // 判断cookie有没有存储token，有的话加入到请求头里
    //if (token) {
    //   config.headers['token'] = token//在请求头中加入token
    // }
    // 如果还需要在请求头内添加其他内容可以自己添加 [] 内为自定义的字段名 = 后的内容为字段名对应的内容
    //config.headers['api'] = api
    return config
}, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
    if (response.statusText === 'OK') {
        return Promise.resolve(response.data)
    } else {
        return Promise.reject(response.data.msg)
    }
}, error => {
    // 请求报错的回调可以和后端协调返回什么状态码，在此根据对应状态码进行对应处理
    if (error.response) {
        // 如401我就让用户返回登录页
        if (error.response.status === 401) {
            // this.props.history.push('/login');
        }
        return Promise.reject(error)
    } else {
        return Promise.reject('请求超时, 请刷新重试')
    }
})

/* 统一封装get请求 */
export const get = (url:string, params?:any, config?:object) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求  */
export const post = (url:string, data:any, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}



