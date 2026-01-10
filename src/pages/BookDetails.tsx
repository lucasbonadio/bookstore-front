import { useNavigate, useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import { deleteBook } from "../services/api";
import { useState } from "react";
import { DeleteBookModal } from "../components/DeleteBookModal";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";

export const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { book, loading, error } = useBook(Number(id));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!book) return;

    try {
      const message = await deleteBook(book.id);
      setIsDeleteModalOpen(false);
      toast.success(message);
      navigate("/");
    } catch {
      setIsDeleteModalOpen(false);
      toast.error("Erro ao excluir livro.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="text-lg font-semibold flex items-center gap-1 hover:text-black transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>

            <span className="text-lg">Voltar</span>
          </button>

          <div className="flex gap-6 font-semibold text-lg">
            <button className="hover:text-blue-600 transition-colors">
              Editar
            </button>
            <button
              onClick={handleOpenDeleteModal}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              Excluir
            </button>
          </div>
        </header>

        <main className="flex flex-col-reverse md:flex-row gap-12 items-start">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {book.title}
            </h1>

            <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6 text-sm md:text-base">
              <span className="text-gray-700">
                Por <strong className="text-gray-900">{book.author}</strong>
              </span>
              {book.publicationDate && (
                <span className="text-gray-600">
                  Publicado em{" "}
                  {new Date(book.publicationDate).toLocaleDateString("pt-BR")}
                </span>
              )}
            </div>

            <div className="text-gray-800 text-lg leading-relaxed text-justify whitespace-pre-wrap">
              {book.description || "Sem descrição disponível para este livro."}
            </div>
          </div>

          <div className="w-full md:w-[350px] flex-shrink-0">
            {book.coverImage ? (
              <img
                src={`data:image/jpeg;base64,${book.coverImage}`}
                alt={`Capa do livro ${book.title}`}
                className="w-full rounded shadow-xl object-cover aspect-[2/3]"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-gray-200 rounded shadow-xl flex items-center justify-center text-gray-400 font-bold">
                Sem Capa
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
