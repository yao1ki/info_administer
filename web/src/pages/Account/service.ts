import { request } from 'umi';
import { UserItem, } from './data.d';

let token = localStorage.getItem('token');

interface ParamsType extends Partial<UserItem> {}

async function listUsers() {
  return request('/api/users/index',{method: 'GET'});
}

async function createUser(data: ParamsType) {
  return request(`/api/users`, { method: 'POST', data });
}

async function updateUser(id: number, data: ParamsType) {
  return request(`/api/users/${id}`, { method: 'PUT', data });
}

async function removeUser(id: number) {
  return request(`/api/users/${id}?token=${token}`, { method: 'DELETE' });
}




async function edit(data: ParamsType) {
  return request('/api/user/edit',{ method: 'PUT', data });
}

async function detail() {
  return request('/api/user/detail')
}

export default {
  listUsers,
  createUser,
  updateUser,
  removeUser,
  edit,
  detail,
};
