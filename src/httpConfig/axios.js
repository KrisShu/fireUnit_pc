import axios from 'axios';
import { Message } from 'element-ui';

// axios.defaults.timeout = 6000
axios.interceptors.request.use(
    config =>{
        return config
    },
    err =>{
        return  Promise.reject(err);
    }
)
axios.interceptors.response.use(
    response =>{
           
            return response
    },
    error =>{
        // console.log(error)
        if(error.response.data.error.message){
            Message.error(error.response.data.error.message)
        }else{
            Message.error("操作失败")
        }
        return  Promise.reject(error.response.data);
        // return  Promise.reject(error.response);
    }
  
)


export default axios