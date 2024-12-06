import { SearchBar } from '../components/SearchBar.tsx'
import { NewsCard } from '../components/NewsCard.tsx'
import { useEffect, useState } from 'react'
import { NewsArticle } from '../types.ts'
import { getNews } from '../api.ts'

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
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      )}
    </>
  )
}

export default Home
