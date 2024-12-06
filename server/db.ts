import sqlite3 from 'sqlite3'
import { promisify } from 'util'
import { NewsArticle } from './types'

const db = new sqlite3.Database('news.db')

// Promisify database operations
const runAsync = promisify(db.run.bind(db))
const allAsync = promisify(db.all.bind(db))

// Create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      url TEXT NOT NULL,
      urlToImage TEXT,
      publishedAt TEXT NOT NULL,
      author TEXT,
      source TEXT NOT NULL,
      content TEXT
    )
  `)
})

export const insertArticle = async (article: NewsArticle) => {
  const stmt = `
    INSERT OR REPLACE INTO articles (title, description, url, urlToImage, publishedAt, author, source, content)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `

  try {
    await runAsync(stmt, [
      article.title,
      article.description,
      article.url,
      article.urlToImage,
      article.publishedAt,
      article.author,
      article.source.name,
      article.content,
    ])
  } catch (error) {
    console.error('Error inserting article:', error)
    throw error
  }
}

export const getArticles = async (searchTerm?: string) => {
  try {
    let query = 'SELECT * FROM articles ORDER BY publishedAt DESC LIMIT 50'
    let params: any[] = []

    if (searchTerm) {
      query = `
        SELECT * FROM articles 
        WHERE title LIKE ? OR description LIKE ? OR content LIKE ?
        ORDER BY publishedAt DESC LIMIT 50
      `
      params = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
    }

    return await allAsync(query, params)
  } catch (error) {
    console.error('Error getting articles:', error)
    throw error
  }
}

export const getArticlesByAuthor = async (author: string) => {
  try {
    const query =
      'SELECT * FROM articles WHERE author = ? ORDER BY publishedAt DESC LIMIT 50'
    return await allAsync(query, [author])
  } catch (error) {
    console.error('Error getting articles by author:', error)
    throw error
  }
}

export default db
