import { useState } from "react";
import { useBooks } from "../hooks/useBooks";
import { BookCard } from "../components/BookCard";
import { SearchBar } from "../components/SearchBar";
import { CreateBookModal } from "../components/CreateBookModal";

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Livros</h1>
        <button
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          Novo
        </button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando sua biblioteca...</p>
        </div>
      )}

      {!loading && error && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative text-center"
          role="alert"
        >
          <strong className="font-bold">Ops! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

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
