import idID from '@/locales/id-ID';
import { request } from 'umi';
import { GhostItem } from './data.d';

interface ParamsType extends Partial<GhostItem> {}

async function listGhost(params: any) {
  return request(`/api/ghostlist/?params=${params}`, { method: 'GET' });
}
async function orderlist(id: any) {
  return request(`/api/orders/${id}`, { method: 'GET' });
}
async function querystate(state: string, params: any) {
  return request(`/api/querystate/${state}?params=${params}`);
}
async function createGhost(data: ParamsType) {
  return request(`/api/ghosts`, { method: 'POST', data });
}

async function updateGhost(id: number, data: ParamsType) {
  return request(`/api/ghosts/${id}`, { method: 'PUT', data });
}

async function update(id: number, data: ParamsType) {
  return request(`/api/orders/${id}`, { method: 'PUT', data });
}
async function removeGhost(id: number) {
  return request(`/api/ghosts/move/${id}`, { method: 'PUT' });
}

async function edit(data: ParamsType) {
  return request('/api/ghosts/edit', { method: 'PUT', data });
}
async function showGhost(id: string) {
  return request(`/api/ghosts/${id}`);
}
async function Order() {
  return request(`/api/orders`);
}
async function list() {
  return request(`/api/material`);
}
async function updateMaterial(id:number,data: ParamsType) {
  return request(`/api/material/${id}`, { method: 'PUT', data });

}

async function experience(data: ParamsType) {
  return request(`/api/journals`, { method: 'POST', data });
}
async function recordlist() {
  return request(`/api/journals`);}
export default {
  experience,
  recordlist,
  listGhost,
  createGhost,
  update,
  orderlist,
  showGhost,
  updateGhost,
  removeGhost,
  querystate,
  edit,
  Order,
  list,
  updateMaterial,
};
