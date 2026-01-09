import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createBook } from "../services/api";

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateBookModal = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateBookModalProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      if (imageFile) {
        formData.append("coverImage", imageFile);
      }

      await createBook(formData);

      setTitle("");
      setAuthor("");
      setDescription("");
      setImageFile(null);
      setPreview(null);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar", error);
      alert("Erro ao salvar o livro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#f3f4f6] rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-2 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Novo livro</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2 space-y-4">
              <input
                type="text"
                placeholder="Título"
                className="w-full p-3 rounded-lg border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Autor"
                className="w-full p-3 rounded-lg border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-1">
              <label className="flex flex-col items-center justify-center w-full h-full min-h-[160px] bg-white rounded-lg cursor-pointer hover:bg-gray-50 shadow-sm border border-transparent hover:border-blue-200 transition-all">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-500">
                      Escolher imagem
                    </span>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="mb-8">
            <textarea
              placeholder="Descrição"
              rows={4}
              className="w-full p-3 rounded-lg border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-2.5 bg-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 bg-[#60a5fa] text-white font-semibold rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
