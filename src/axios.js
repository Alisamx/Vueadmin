import axios from "axios";
import router from "@/router";
import Element from "element-ui";

// axios.defaults.baseURL = "http://localhost:8081"

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json, charset=utf-8'
    }
})

request.interceptors.request.use( config => {
    console.log(1111111)
    config.headers['Authorization'] = localStorage.getItem("token")
    return config
})

request.interceptors.response.use(response => {
    console.log(222222)
    let res = response.data
    if(res.code === 200){
        return response
    } else {
        Element.Message.error(res.msg? res.msg : '系统异常！', {duration: 3 * 1000})
        return Promise.reject(response.data.msg)
    }
}, error => {

    console.log(error)

    if (error.response.data) {
        error.massage = error.response.data.msg
    }
    if (error.response.status === 401) {
        router.push("/login")
    }
    Element.Message.error(error.massage)
    return Promise.reject(error)
  }
)

export default request