// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';
import '../static/css/common.css';
import common from './assets/common.js';
Vue.prototype.common = common
// 引入axios
import axios from 'axios'
import Vuelazyload from 'vue-lazyload'

//引入vue-socket.io模块  把这块注释掉才不会报错EIO=3&transport=polling
// import socket from 'socket.io-client'
// // 连接到指定服务地址
// Vue.use(new socket ({
//     debug: true,
//     connection: 'http://localhost:3000' //地址+端口，由后端提供
// }));
// 将axios挂载到vue原型链上
// Vue.prototype.baseUrl = process.env.API_ROOT//接口的基础url
// http://47.103.40.123:8082/api  服务器
Vue.prototype.baseUrl = "//localhost:8082/api" //接口的基础url
Vue.prototype.axios = axios

Vue.use(iView);
Vue.use(Vuelazyload, {
    loading: "./../static/image/template/loading-bars.svg",
    try: 3
});

// 按需引入iview组件
// import { Button, Layout,Header,Content,Footer } from 'iview';
// Vue.component('Button', Button);
// Vue.component('Layout', Layout);
// Vue.component('Header', Header);
// Vue.component('Content', Content);
// Vue.component('Footer', Footer);

// 格式化时间为年月日时分秒格式
// Sun Apr 26 2020 22:05:50 GMT+0800 (中国标准时间)  =>  2020-04-26 22:05:50
function formatTen(num) {
    return num > 9 ? (num + "") : ("0" + num);
}
Vue.filter('formatDate', function(date) {
    var date = new Date(date)
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + formatTen(month) + "-" + formatTen(day) + " " + formatTen(hour) + ":" + formatTen(minute) + ":" + formatTen(second);
    

})
// 格式化简历base区信息
Vue.filter('formatResumeBase', function(value, fmt) {
    switch (value) {
        case "name":
            fmt = "姓名"
            break;
        case "tel":
            fmt = "手机号"
            break;
        case "Email":
            fmt = "邮箱"
            break;
        case "edu":
            fmt = "学历"
            break;
        case "address":
            fmt = "住址"
            break;
        case "salary":
            fmt = "期望薪资"
            break;
        case "position":
            fmt = "期望职位"
            break;
        default:
            break;
    }
    return fmt
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})