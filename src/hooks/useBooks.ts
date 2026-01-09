import { useState, useEffect } from 'react';
import type { Book } from '../types/Book';
import type { ApiError } from '../types/ApiError';
import { getBooks } from '../services/api';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError.Message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, refetch: fetchBooks };
};