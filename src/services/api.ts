import axios from 'axios';
import type { Book } from '../types/Book';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>('/Books');
  return response.data;
};