import idID from '@/locales/id-ID';
import { request } from 'umi';
import { GhostItem } from './data.d';

interface ParamsType extends Partial<GhostItem> {}


async function list(){
  return request('/api/list',{ method:'GET'});
}


async function updateGhost(id: number, data: ParamsType) {
  return request(`/api/ghosts/${id}`, { method: 'PUT', data });
}

async function createOrder(data: ParamsType) {
  return request(`/api/orders`, { method: 'POST', data });
}

async function removeOrder(id: number) {
  return request(`/api/orders/moveghost/${id}`, { method: 'PUT' });
}





export default {
  removeOrder,
  createOrder,
  list,
  updateGhost
};
