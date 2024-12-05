import React from 'react';
import { ExternalLink, User, Calendar } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{article.title}</h2>
        <p className="text-gray-600 mb-4">{article.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          {article.author && (
            <div className="flex items-center gap-1">
              <User size={16} />
              <span>{article.author}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{formattedDate}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-indigo-600">{article.source}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Read More <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};