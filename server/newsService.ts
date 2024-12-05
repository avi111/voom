import axios from 'axios';
import {NewsResponse} from './types';
import {insertArticle} from './db';

const NEWS_API_URL = 'https://newsapi.org/v2/everything';
export const fetchAndStoreNews = async () => {
    const url = `${NEWS_API_URL}?q=${encodeURI(`drones OR drone OR UAV OR "unmanned aerial"`)}&apiKey=${process.env.VITE_NEWS_API_KEY}&language=en&sortBy=publishedAt&pageSize=100`;
    try {
        const response = await axios.get<NewsResponse>(url, {});

        for (const article of response.data.articles) {
            await insertArticle({
                ...article,
                source: article.source,
            });
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};