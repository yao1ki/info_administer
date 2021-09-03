import idID from '@/locales/id-ID';
import { request } from 'umi';
import { GhostItem } from './data.d';

interface ParamsType extends Partial<GhostItem> {}



async function list() {
  return request(`/api/notic`, { method: 'GET'});

}



export default {

  list,

};
