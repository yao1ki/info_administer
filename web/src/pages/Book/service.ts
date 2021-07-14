import idID from '@/locales/id-ID';
import { request } from 'umi';
import { BookItem } from './data.d';

interface ParamsType extends Partial<BookItem> {}

async function listBooks() {
  return request('/api/books', { method: 'GET' });
}
async function currentBook(id: string, data: ParamsType) {
  return request(`/api/books/${id}`, { method: 'post', data });
}
async function createBook(data: ParamsType) {
  return request(`/api/books`, { method: 'POST', data });
}

async function updateBook(id: number, data: ParamsType) {
  return request(`/api/books/${id}`, { method: 'PUT', data });
}

async function removeBook(id: number) {
  return request(`/api/books/${id}`, { method: 'DELETE' });
}

async function edit(data: ParamsType) {
  return request('/api/book/edit', { method: 'PUT', data });
}
async function showBook(id: string) {
  return request(`/api/books/${id}`);
}

async function detail() {
  return request('/api/book/detail');
}

export default {
  listBooks,
  currentBook,
  createBook,
  showBook,
  updateBook,
  removeBook,
  edit,
  detail,
};
