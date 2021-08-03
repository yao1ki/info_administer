import { request } from 'umi';
import { ToolItem } from './data.d';


interface ParamsType extends Partial<ToolItem> {}

async function list() {
  return request('/api/tools', { method: 'GET' });
}
async function updateTool(id: number, data: ParamsType) {
  return request(`/api/tools/${id}`, { method: 'PUT', data });
}

export default {
  list,
  updateTool,

};
