import axios from 'axios';
import { message } from 'antd';
export default function (url, data = {},method = 'get') {
  method = method.toLowerCase()
  data = method === 'get'? { params:data } : data;
  return axios[method](url,data)
    .then((res) => {
      if(res.data.status === 0) {
        return res.data;
      } else {
        message.error(res.data.msg,2);
      }
    })
    .catch((error) => {
      message.error('网络故障，请稍后重试')
    })
}