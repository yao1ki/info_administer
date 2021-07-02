import { request } from 'umi';

export async function queryCurrent() {
  const res = await request(`/api/user?token=${localStorage.getItem('token')}`);
  return res.data
}
