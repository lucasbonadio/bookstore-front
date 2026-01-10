import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import type { Book } from '../types/Book';
import { vi, describe, it, expect } from 'vitest';

const mockBook: Book = {
  id: 1,
  title: 'A Revolução dos Bichos',
  author: 'George Orwell',
  description: 'Um conto de fadas...',
  coverImage: 'base64falso...', 
  publicationDate: new Date('1945-08-17')
};

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockNavigate,
  };
});

describe('Componente: BookCard', () => {
  it('deve renderizar as informações principais do livro', () => {
    render(
      <BrowserRouter>
        <BookCard book={mockBook} />
      </BrowserRouter>
    );

    expect(screen.getByText('A Revolução dos Bichos')).toBeInTheDocument();
    expect(screen.getByText('George Orwell')).toBeInTheDocument();
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('base64falso'));
  });

  it('deve navegar para a página de detalhes ao ser clicado', () => {
    render(
      <BrowserRouter>
        <BookCard book={mockBook} />
      </BrowserRouter>
    );

    const cardTitle = screen.getByText('A Revolução dos Bichos');
    fireEvent.click(cardTitle);

    expect(mockNavigate).toHaveBeenCalledWith('/livro/1');
  });
});