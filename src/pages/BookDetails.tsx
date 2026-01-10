import { useBookDetails } from "../hooks/useBookDetails";
import { DeleteBookModal } from "../components/DeleteBookModal";
import { BookFormModal } from "../components/BookFormModal";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";

export const BookDetails = () => {
  const {
    book,
    loading,
    error,
    isDeleteModalOpen,
    isEditModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleConfirmDelete,
    handleEditSuccess,
    handleBack,
  } = useBookDetails();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
      <DeleteBookModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <BookFormModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSuccess={handleEditSuccess}
        bookToEdit={book}
      />

      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-200 pb-6">
          <button
            onClick={handleBack}
            className="text-lg font-bold flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group px-2 py-1 -ml-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="text-xl tracking-tight">Voltar</span>
          </button>

          <div className="flex gap-3 font-medium text-base self-end md:self-auto">
            <button
              onClick={handleOpenEditModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Editar
            </button>

            <button
              onClick={handleOpenDeleteModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 border border-transparent rounded-lg hover:bg-red-100 transition-all active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Excluir
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="w-full order-2 lg:order-1 lg:col-span-8">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight">
              {book.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 text-gray-600 mb-8 text-base md:text-lg">
              <span className="flex items-center gap-2 bg-white py-1 rounded-full border border-gray-200 shadow-sm">
                👤 <strong className="text-gray-900">{book.author}</strong>
              </span>
              {book.publicationDate && (
                <span className="flex items-center gap-2 bg-white py-1 rounded-full border border-gray-200 shadow-sm font-bold">
                  📅 Publicado em{" "}
                  {new Date(book.publicationDate).toLocaleDateString("pt-BR")}
                </span>
              )}
            </div>

            <div className="text-gray-700 text-base font-normal leading-relaxed text-justify whitespace-pre-wrap break-words">
              {book.description || "Sem descrição disponível."}
            </div>
          </div>

          <div className="w-full flex-shrink-0 flex justify-center lg:justify-end order-1 lg:order-2 lg:col-span-4">
            {book.coverImage ? (
              <img
                src={`data:image/jpeg;base64,${book.coverImage}`}
                alt={book.title}
                className="w-[240px] lg:w-full max-w-sm rounded-xl shadow-lg object-cover aspect-[2/3]"
              />
            ) : (
              <div className="w-[240px] lg:w-full max-w-sm aspect-[2/3] bg-gray-200 rounded-xl shadow-inner flex items-center justify-center text-gray-400 font-bold border-2 border-dashed border-gray-300">
                Sem Capa
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
