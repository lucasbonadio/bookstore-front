import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { updateBook } from "../services/api";
import type { Book } from "../types/Book";

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  book: Book;
}

export const EditBookModal = ({
  isOpen,
  onClose,
  onSuccess,
  book,
}: EditBookModalProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && book) {
      setTitle(book.title);
      setAuthor(book.author);
      setDescription(book.description || "");
      
      if (book.publicationDate) {
        const dateObj = new Date(book.publicationDate);
        setPublicationDate(dateObj.toISOString().split('T')[0]);
      } else {
        setPublicationDate("");
      }

      if (book.coverImage) {
        setPreview(`data:image/jpeg;base64,${book.coverImage}`);
      } else {
        setPreview(null);
      }
      setImageFile(null);
    }
  }, [isOpen, book]);

  if (!isOpen) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("description", description);
      
      if (publicationDate) {
        formData.append("publicationDate", publicationDate);
      }

      if (imageFile) {
        formData.append("coverImage", imageFile);
      }

      await updateBook(book.id, formData);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar", error);
      alert("Erro ao atualizar o livro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#f2f2f2] rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">
          Editar livro
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
            <div className="md:col-span-2 space-y-4 md:space-y-5">
              <input
                type="text"
                placeholder="Nome do livro"
                className="w-full p-3 md:p-4 rounded-xl border-none shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              
              <input
                type="text"
                placeholder="Autor"
                className="w-full p-3 md:p-4 rounded-xl border-none shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />

              <div className="relative">
                <input
                  type="date"
                  className="w-full p-3 md:p-4 rounded-xl border-none shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={publicationDate}
                  onChange={(e) => setPublicationDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="md:col-span-1 h-64 md:h-full">
              <label className="flex flex-col items-center justify-center w-full h-full min-h-[200px] bg-gray-300 rounded-xl cursor-pointer hover:opacity-90 transition-all overflow-hidden relative shadow-inner">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview da capa"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-500 p-4">
                    <span className="block font-medium">Sem Capa</span>
                    <span className="text-sm">Clique para adicionar</span>
                  </div>
                )}
                
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center group">
                    <span className="text-white opacity-0 group-hover:opacity-100 font-bold bg-black/50 px-3 py-1 rounded-full text-sm">Alterar Capa</span>
                </div>
              </label>
            </div>
          </div>

          <div className="mb-8">
             <textarea
              placeholder="Descrição/Sinopse"
              rows={6}
              className="w-full p-3 md:p-4 rounded-xl border-none shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none text-justify leading-relaxed"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-10 py-3 bg-gray-300 text-gray-800 font-bold rounded-full hover:bg-gray-400 transition-colors min-w-[160px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-3 bg-[#008ae6] text-white font-bold rounded-full hover:bg-[#0077c5] transition-colors disabled:opacity-50 min-w-[160px]"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};