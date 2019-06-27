import ajax from './ajax';
import { message } from 'antd';
import jsonp from 'jsonp';
export const login = (username, password) => ajax('/login', {username,password}, 'post' );
export const reqValidate = (id) => ajax('/validate/user', {id} ,'post');
export const reqWeather = () => {
  let cancel = null;
  const promise = new Promise((resolve, reject) => {
    cancel = jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',{},(err,data) => {
        if(!err) {
          const { dayPictureUrl,weather } = data.results[0].weather_data[0];
          resolve({weatherImg:dayPictureUrl,weather});
        }else {
          message.error('请求天气失败，请刷新重试');
          resolve();
        }
    })
  });
  return {
    promise,
    cancel
  }
}
export const reqCategories = (parentId) => ajax('/manage/category/list',{parentId});

export const reqAddCategory = (parentId,categoryName) => ajax('/manage/category/add',{parentId,categoryName},'post')
export const reqUpdateCategory = (categoryId,categoryName) => ajax('/manage/category/update',{categoryId,categoryName},'post')
export const reqProducts = (pageNum,pageSize) => ajax('/manage/product/list',{pageNum,pageSize},'get')
export const reqAddProduct = ({name,desc,price,categoryId,pCategoryId,detail}) => ajax('/manage/product/add',{name,desc,price,categoryId,pCategoryId,detail},'post')