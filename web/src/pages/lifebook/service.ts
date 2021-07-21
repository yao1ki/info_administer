import idID from '@/locales/id-ID';
import { request } from 'umi';
import { GhostItem } from './data.d';

interface ParamsType extends Partial<GhostItem> {}

async function listGhost() {
  return request('/api/ghosts', { method: 'GET' });
}
async function querystate(state: string,params: any) {
  return request(`/api/querystate/${state}?params=${params}`);
}
async function createGhost(data: ParamsType) {
  return request(`/api/ghosts`, { method: 'POST', data });
}

async function updateGhost(id: number, data: ParamsType) {
  return request(`/api/ghosts/${id}`, { method: 'PUT', data });
}

async function removeGhost(id: number) {
  return request(`/api/ghosts/destroy/${id}`, { method: 'PUT' });
}

async function edit(data: ParamsType) {
  return request('/api/ghosts/edit', { method: 'PUT', data });
}
async function showGhost(id: string) {
  return request(`/api/ghosts/${id}`);
}


export default {
  listGhost,
  createGhost,
  showGhost,
  updateGhost,
  removeGhost,
  querystate,
  edit,

};
