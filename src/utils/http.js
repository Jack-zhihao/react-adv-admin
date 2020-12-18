import Axios from 'axios'
import qs from 'qs'
import Config from './config'
import {message} from 'antd'
import {getCookie, removeCookie} from './cookie'

const axios = Axios.create();

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use((config) => {
    const { baseUrl, ENV } = Config

    config.baseURL = baseUrl[ENV];
    config.timeout = 5000;
    console.log(getCookie('info'))
    config.headers.Authorization = getCookie('info').token || '';

    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }

    // config.headers.authorization = token

    return config;
});
// Add a response interceptor
axios.interceptors.response.use((response) => {
    console.log('response---:', response)

    const {data} = response;
    if(data.code === 0) { 
        message.error(data.message);
        // setTimeout(function() {
        //     window.location.href="/"
        // }, 3000);
        return Promise.reject('接口错误，请重新发起！')
    }
    else if(data.code === 2) {
        message.error(data.message);
        removeCookie('info')

        setTimeout(function() {
            window.location.href="/"
        }, 3000);
        return Promise.reject('用户信息已过期，请重新登录！')
    }
    else {
        return response.data;
    }
},
    (error) => {
        return Promise.reject(error, '接口请求失败，请反馈客服处理！');
    }
);
export default axios;
