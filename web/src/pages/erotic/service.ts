import idID from '@/locales/id-ID';
import { request } from 'umi';
import { GhostItem } from './data.d';

interface ParamsType extends Partial<GhostItem> {}



async function userlist(potence: string) {
  return request(`/api/userlist/${potence}`, { method: 'GET'});

}
async function listGhost(params: any) {
  return request(`/api/ghostlist/?params=${params}`, { method: 'GET' });

}
async function querystate(state: string,params: any) {
  return request(`/api/order/list/${state}?params=${params}`);
}
async function createOrder(data: ParamsType) {
  return request(`/api/orders`, { method: 'POST', data });
}

async function updateGhost(id: number, data: ParamsType) {
  return request(`/api/ghosts/${id}`, { method: 'PUT', data });
}


async function list(state: string,params: any) {
  return request(`/api/list/${state}?params=${params}`);
}
async function listtool() {
  return request('/api/tools', { method: 'GET' });
}
async function updateTool(id: number, data: ParamsType) {
  return request(`/api/tools/${id}`, { method: 'PUT', data });
}




export default {
  listtool,
  updateTool,
  listGhost,
  updateGhost,
  querystate,
  userlist,
  list,
  createOrder,
};
