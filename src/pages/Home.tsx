import { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { BookCard } from "../components/BookCard";
import { SearchBar } from "../components/SearchBar";
import { CreateBookModal } from "../components/CreateBookModal";
import { NewButton } from "../components/NewButton";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";

export const Home = () => {
  const { books, loading, error, refetch } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <CreateBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          refetch();
        }}
      />
      <NewButton setIsModalOpen={setIsModalOpen}/>      

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {loading && <LoadingSpinner />}

      {!loading && error && <ErrorMessage message={error} />}

      {!loading && !error && filteredBooks.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
          <span className="text-4xl block mb-4">📚</span>
          <h3 className="text-lg font-medium text-gray-900">
            Nenhum livro encontrado
          </h3>
          <p className="text-gray-500 mt-2">
            {books.length === 0
              ? "Sua coleção está vazia. Cadastre o primeiro livro!"
              : `Não encontramos resultados para "${searchTerm}"`}
          </p>
        </div>
      )}

      {!loading && !error && filteredBooks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};
