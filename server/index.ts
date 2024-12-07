import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { getArticles, getArticlesByAuthor } from './db'
import {
  fetchAndStoreNews,
  getUniqueArticles,
  getWikipediaInfo,
} from './newsService'
import { NewsArticleDB } from './types'

dotenv.config()

const app = express()
const port = process.env.VITE_PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/news', async (req, res) => {
  try {
    const { search } = req.query
    const articles: NewsArticleDB[] = await getArticles(search as string)
    const json = getUniqueArticles(articles.filter((article) => article.author))
    res.json(json)
  } catch (error) {
    console.error('Error fetching articles:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/author', async (req, res) => {
  const name = req.query.name as string
  try {
    const authorBio = await getWikipediaInfo(name)
    let authorArticles = await getArticlesByAuthor(name)
    authorArticles = getUniqueArticles(
      authorArticles.filter((article) => article.author)
    )
    res.json({ authorBio, authorArticles })
  } catch (error) {
    console.error('Error fetching author data:', error)
    res.status(500).json({ error })
  }
})

// Fetch news every 30 minutes
const updateNews = async () => {
  try {
    await fetchAndStoreNews()
    console.log('News updated successfully')
  } catch (error) {
    console.error('Failed to update news:', error)
  }
}

void updateNews()
setInterval(updateNews, 30 * 60 * 1000)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
