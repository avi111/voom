import { NewsArticleDB } from './types'
import { getUniqueArticles } from './newsService'

describe('getUniqueArticles', () => {
  it('should return unique articles based on title, description, author, and source', () => {
    const articles: NewsArticleDB[] = [
      {
        title: 'Breaking News',
        description: 'This is a description',
        url: 'http://example.com/1',
        urlToImage: 'http://example.com/img1',
        publishedAt: '2024-12-01T10:00:00Z',
        author: 'John Doe',
        source: 'Source 1',
        content: 'Content of the article',
      },
      {
        title: 'Breaking News',
        description: 'This is a description',
        url: 'http://example.com/2',
        urlToImage: 'http://example.com/img2',
        publishedAt: '2024-12-02T10:00:00Z',
        author: 'John Doe',
        source: 'Source 1',
        content: 'Different content',
      },
      {
        title: 'Another News',
        description: 'Another description',
        url: 'http://example.com/3',
        urlToImage: 'http://example.com/img3',
        publishedAt: '2024-12-01T11:00:00Z',
        author: 'Jane Doe',
        source: 'Source 2',
        content: 'Content of another article',
      },
    ]

    const uniqueArticles = getUniqueArticles(articles)

    expect(uniqueArticles).toHaveLength(2)
    expect(uniqueArticles).toEqual([
      {
        title: 'Breaking News',
        description: 'This is a description',
        url: 'http://example.com/1',
        urlToImage: 'http://example.com/img1',
        publishedAt: '2024-12-01T10:00:00Z',
        author: 'John Doe',
        source: 'Source 1',
        content: 'Content of the article',
      },
      {
        title: 'Another News',
        description: 'Another description',
        url: 'http://example.com/3',
        urlToImage: 'http://example.com/img3',
        publishedAt: '2024-12-01T11:00:00Z',
        author: 'Jane Doe',
        source: 'Source 2',
        content: 'Content of another article',
      },
    ])
  })

  it('should return an empty array when given an empty array', () => {
    const articles: NewsArticleDB[] = []
    const uniqueArticles = getUniqueArticles(articles)

    expect(uniqueArticles).toEqual([])
  })

  it('should handle articles with null description or author gracefully', () => {
    const articles: NewsArticleDB[] = [
      {
        title: 'Title 1',
        description: null,
        url: 'http://example.com/1',
        urlToImage: null,
        publishedAt: '2024-12-01T10:00:00Z',
        author: null,
        source: 'Source 1',
        content: 'Content 1',
      },
      {
        title: 'Title 1',
        description: null,
        url: 'http://example.com/2',
        urlToImage: null,
        publishedAt: '2024-12-02T10:00:00Z',
        author: null,
        source: 'Source 1',
        content: 'Content 2',
      },
    ]

    const uniqueArticles = getUniqueArticles(articles)

    expect(uniqueArticles).toHaveLength(1)
    expect(uniqueArticles).toEqual([
      {
        title: 'Title 1',
        description: null,
        url: 'http://example.com/1',
        urlToImage: null,
        publishedAt: '2024-12-01T10:00:00Z',
        author: null,
        source: 'Source 1',
        content: 'Content 1',
      },
    ])
  })
})
