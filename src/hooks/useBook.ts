import { useState, useEffect, useCallback } from 'react';
import type { Book } from '../types/Book';
import type { ApiError } from '../types/ApiError';
import { getBookById } from '../services/api';

export const useBook = (id: number | undefined) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBook = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getBookById(id);
      setBook(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.Message || 'Erro ao buscar livro');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  return { book, loading, error, refetch: fetchBook };
};