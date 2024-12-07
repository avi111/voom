import { NewsCard } from '../components/NewsCard.tsx'
import { useEffect, useState } from 'react'
import { NewsArticle, WikipediaPage } from '../types.ts'
import { getAuthorData } from '../api.ts'
import { useSearchParams } from 'react-router-dom'
import { AxiosError } from 'axios'

const Author = () => {
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name')
  const [authorBio, setAuthorBio] = useState<WikipediaPage>({
    content_urls: {
      desktop: {
        edit: '',
        page: '',
        revisions: '',
        talk: '',
      },
      mobile: { edit: '', page: '', revisions: '', talk: '' },
    },
    description: '',
    description_source: '',
    dir: '',
    displaytitle: '',
    extract: '',
    extract_html: '',
    lang: '',
    namespace: { id: 0, text: '' },
    originalimage: { height: 0, source: '', width: 0 },
    pageid: 0,
    revision: '',
    thumbnail: { height: 0, source: '', width: 0 },
    tid: '',
    timestamp: '',
    title: '',
    titles: { canonical: '', display: '', normalized: '' },
    type: '',
    wikibase_item: '',
  })
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true)
        const authorName = decodeURI(name + '')
        if (!authorName) return
        const data = await getAuthorData(decodeURI(authorName))
        setArticles(data.authorArticles || [])
        setAuthorBio(data.authorBio || {})
      } catch (error) {
        console.error(
          'Error fetching news:',
          (
            (error as AxiosError).response?.data as {
              error: Error
            }
          ).error.message
        )
        setArticles([])
        setAuthorBio({
          title: 'Author not found',
          extract: 'No information found for this author.',
        } as WikipediaPage)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchAuthorData, 300)
    return () => clearTimeout(debounceTimer)
  }, [name])

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold mb-4'>{authorBio.title}</h1>
        <p>{authorBio.extract}</p>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
        </div>
      ) : articles.length ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {articles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      ) : (
        <p className='text-center text-gray-600 mt-8'>
          No articles found for this author.
        </p>
      )}
    </>
  )
}

export default Author
