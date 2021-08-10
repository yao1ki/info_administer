import { request } from 'umi';
import { GhostItem } from './data.d';

let token = localStorage.getItem('token');

interface ParamsType extends Partial<GhostItem> {}

async function list(params: any) {
  return request(`/api/order/record/?params=${params}`);

}
export default {
  list,
};
