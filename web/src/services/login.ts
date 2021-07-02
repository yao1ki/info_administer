import { request } from 'umi';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
  force?: boolean;
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}

export async function login(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: {
      username: params.username,
      password: params.password,
    },
  });
}

export async function logout() {
  return request('/api/logout');
}
