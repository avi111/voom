import { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';
import { NewsCard } from './components/NewsCard';
import { SearchBar } from './components/SearchBar';
import { getNews } from './api';
import { NewsArticle } from './types';

console.log(import.meta.env);
const App = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getNews(searchTerm);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchNews, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plane className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Drone News Hub</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.url} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;