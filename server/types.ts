export interface NewsArticle {
  id?: number
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  author: string | null
  source: {
    id: string | null
    name: string
  }
  content: string | null
}

export interface NewsArticleDB {
  id?: number
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  author: string | null
  source: string
  content: string | null
}

export interface NewsResponse {
  articles: NewsArticle[]
  totalResults: number
}
