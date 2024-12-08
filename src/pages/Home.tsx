import { SearchBar } from '../components/SearchBar.tsx'
import { NewsCard } from '../components/NewsCard.tsx'
import { useEffect, useState } from 'react'
import { NewsArticle } from '../types.ts'
import { getNews } from '../api.ts'
import Loader from '../components/Loader.tsx'

const Home = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const data = await getNews(searchTerm)
        setArticles(data)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchNews, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  return (
    <>
      <div className='mb-8'>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <Loader />
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.length ? (
            articles.map((article) => (
              <NewsCard key={article.url} article={article} />
            ))
          ) : (
            <p className='text-center text-gray-600 mt-8'>
              No articles found for this search term.
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default Home
