import { useNavigate, useParams } from "react-router-dom";
import { useBook } from "../hooks/useBook";
import { deleteBook } from "../services/api";

export const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { book, loading, error } = useBook(Number(id));

  const handleDelete = async () => {
    if (!book) return;

    if (window.confirm("Tem certeza que deseja excluir este livro?")) {
      try {
        const message = await deleteBook(book.id);
        alert(message);
        navigate("/");
      } catch (err) {
        console.log(err)
        alert("Erro ao excluir livro.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-gray-50 flex justify-center items-start">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative max-w-lg w-full text-center">
          <strong className="font-bold">Ops! </strong>
          <span>{error}</span>
          <button
            onClick={() => navigate("/")}
            className="block mx-auto mt-4 text-sm underline"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-gray-800">
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
              onClick={handleDelete}
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
