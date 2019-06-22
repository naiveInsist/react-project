import ajax from './ajax';
export const login = (username, password) => ajax('/login', {username,password}, 'post' );