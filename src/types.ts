export interface NewsArticle {
  id?: number;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  author: string | null;
  source: string;
  content: string | null;
}