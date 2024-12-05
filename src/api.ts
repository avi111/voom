import axios from 'axios';
import { NewsArticle } from './types';

const API_URL = import.meta.env.VITE_API_URL;

export const getNews = async (searchTerm?: string): Promise<NewsArticle[]> => {
  const params = searchTerm ? { search: searchTerm } : {};
  const response = await axios.get(`${API_URL}/news`, { params });
  return response.data || [];
};