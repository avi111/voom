import axios from 'axios'
import { NewsArticleDB, NewsResponse } from './types'
import { insertArticle } from './db'

const NEWS_API_URL = 'https://newsapi.org/v2/everything'
const WIKIPEDIA_API_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary'
export const fetchAndStoreNews = async () => {
  const url = `${NEWS_API_URL}?q=${encodeURI(`drones OR drone OR UAV OR "unmanned aerial"`)}&apiKey=${process.env.VITE_NEWS_API_KEY}&language=en&sortBy=publishedAt&pageSize=100`
  try {
    const response = await axios.get<NewsResponse>(url, {})

    for (const article of response.data.articles) {
      await insertArticle({
        ...article,
        source: article.source,
      })
    }

    return response.data
  } catch (error) {
    console.error('Error fetching news:', error)
    throw error
  }
}

export const getWikipediaInfo = async (searchQuery) => {
  const url = `${WIKIPEDIA_API_URL}/${encodeURIComponent(searchQuery)}`

  // Send a GET request to the Wikipedia API
  const response = await axios.get(url)

  // Check if the page exists and return the extract (summary)
  if (response.data) {
    return response.data
  } else {
    throw new Error('No summary found for this query.')
  }
}

export const getUniqueArticles = (
  articles: NewsArticleDB[]
): NewsArticleDB[] => {
  const uniqueArticles = new Map<string, NewsArticleDB>()

  for (const article of articles) {
    const key = `${article.title}|${article.description}|${article.author}|${article.source}`
    if (!uniqueArticles.has(key)) {
      uniqueArticles.set(key, article)
    }
  }

  return Array.from(uniqueArticles.values())
}
