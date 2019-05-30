import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function login(params){
  return request("/api/user/login",{
    method: 'POST',
    params: params,
  })
}
export async function regist(params){
  return request("/api/user/regist",{
    method: 'POST',
    params: params,
  })
}