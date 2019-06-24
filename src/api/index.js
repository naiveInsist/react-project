import ajax from './ajax';
import { message } from 'antd';
import jsonp from 'jsonp';
export const login = (username, password) => ajax('/login', {username,password}, 'post' );
export const reqValidate = (id) => ajax('/validate/user', {id} ,'post');
export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',{},(err,data) => {
        if(!err) {
          const { dayPictureUrl,weather } = data.results[0].weather_data[0];
          resolve({weatherImg:dayPictureUrl,weather});
        }else {
          message.error('请求天气失败，请刷新重试');
          resolve();
        }
    })
  })
}
export const reqCategories = (parentId) => ajax('/manage/category/list',{parentId});