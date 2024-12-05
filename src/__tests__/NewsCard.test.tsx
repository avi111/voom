import { render, screen } from '@testing-library/react';
import { NewsCard } from '../components/NewsCard';

describe('NewsCard', () => {
  const mockArticle = {
    title: 'Test Drone News',
    description: 'This is a test description',
    url: 'https://example.com',
    urlToImage: 'https://example.com/image.jpg',
    publishedAt: '2024-03-10T12:00:00Z',
    author: 'John Doe',
    source: 'Test Source',
    content: 'Test content'
  };

  it('renders article title', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('Test Drone News')).toBeDefined();
  });

  it('renders article description', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('This is a test description')).toBeDefined();
  });

  it('renders author name when provided', () => {
    render(<NewsCard article={mockArticle} />);
    expect(screen.getByText('John Doe')).toBeDefined();
  });
});