const keepTime = 1000 * 3600 * 24 * 7;
const USER_KEY = 'USER_KEY';
const USER_TIME = 'USER_TIME';
export const getItem = () => {
  if(Date.now() - localStorage.getItem(USER_TIME) > keepTime) return 
  return JSON.parse(localStorage.getItem(USER_KEY));
}
export const setItem = (val) => {
  localStorage.setItem(USER_TIME,Date.now());
  localStorage.setItem(USER_KEY,JSON.stringify(val));
}
export const removeItem = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(USER_TIME);
}