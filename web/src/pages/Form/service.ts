import idID from '@/locales/id-ID';
import { request } from 'umi';
import { GhostItem } from './data.d';

interface ParamsType extends Partial<GhostItem> {}



async function userlist(potence: string) {
  return request(`/api/userlist/${potence}`, { method: 'GET'});

}
async function querystate(state: string,params: any) {
  return request(`/api/querystate/${state}?params=${params}`);
}
async function createOrder(data: ParamsType) {
  return request(`/api/orders`, { method: 'POST', data });
}

async function updateGhost(id: number, data: ParamsType) {
  return request(`/api/ghosts/${id}`, { method: 'PUT', data });
}

async function removeOrder(id: number) {
  return request(`/api/orders/move/${id}`, { method: 'PUT' });
}
async function list(state: string,params: any) {
  return request(`/api/list/${state}?params=${params}`);
}




export default {
  updateGhost,
  removeOrder,
  querystate,
  userlist,
  list,
  createOrder,
};
