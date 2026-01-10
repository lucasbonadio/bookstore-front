import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { createBook, updateBook } from "../services/api";
import type { Book } from "../types/Book";

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bookToEdit?: Book | null;
}
interface ValidationErrors {
  title?: string;
  author?: string;
  publicationDate?: string;
  description?: string;
  coverImage?: string;
}

export const BookFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  bookToEdit,
}: BookFormModalProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const isEditMode = !!bookToEdit;

  useEffect(() => {
    if (isOpen) {
      setErrors({});

      if (bookToEdit) {
        setTitle(bookToEdit.title);
        setAuthor(bookToEdit.author);
        setDescription(bookToEdit.description || "");

        if (bookToEdit.publicationDate) {
          const dateObj = new Date(bookToEdit.publicationDate);
          setPublicationDate(dateObj.toISOString().split("T")[0]);
        } else {
          setPublicationDate("");
        }

        if (bookToEdit.coverImage) {
          setPreview(`data:image/jpeg;base64,${bookToEdit.coverImage}`);
        } else {
          setPreview(null);
        }
      } else {
        setTitle("");
        setAuthor("");
        setDescription("");
        setPublicationDate("");
        setPreview(null);
      }
      setImageFile(null);
    }
  }, [isOpen, bookToEdit]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!title.trim()) newErrors.title = "O título é obrigatório.";
    if (!author.trim()) newErrors.author = "O autor é obrigatório.";
    if (!publicationDate) newErrors.publicationDate = "A data é obrigatória.";
    if (!description.trim()) newErrors.description = "A descrição é obrigatória.";

    if (!isEditMode && !imageFile) {
      newErrors.coverImage = "A capa é obrigatória.";
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      if (errors.coverImage) setErrors({ ...errors, coverImage: undefined });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      toast.warn("Preencha todos os campos obrigatórios.");
      return;
    }

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

      if (isEditMode) {
        await updateBook(bookToEdit.id, formData);
        toast.success("Livro atualizado com sucesso!");
      } else {
        await createBook(formData);
        toast.success("Livro criado com sucesso!");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      const action = isEditMode ? "atualizar" : "salvar";
      toast.error(`Erro ao ${action} o livro.`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ValidationErrors, value: string) => {
    if (field === 'title') setTitle(value);
    if (field === 'author') setAuthor(value);
    if (field === 'publicationDate') setPublicationDate(value);
    if (field === 'description') setDescription(value);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
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
          {isEditMode ? "Editar livro" : "Novo livro"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
            <div className="md:col-span-2 space-y-4 md:space-y-5">
              
              <div>
                <input
                  type="text"
                  placeholder="Nome do livro"
                  className={`w-full p-3 md:p-4 rounded-xl shadow-sm text-gray-800 focus:ring-2 outline-none transition-all ${
                    errors.title 
                      ? "border-2 border-red-500 focus:ring-red-200" 
                      : "border-none focus:ring-blue-500"
                  }`}
                  value={title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
                {errors.title && (
                  <span className="text-red-500 text-sm mt-1 ml-1 block">{errors.title}</span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Autor"
                  className={`w-full p-3 md:p-4 rounded-xl shadow-sm text-gray-800 focus:ring-2 outline-none transition-all ${
                    errors.author 
                      ? "border-2 border-red-500 focus:ring-red-200" 
                      : "border-none focus:ring-blue-500"
                  }`}
                  value={author}
                  onChange={(e) => handleChange('author', e.target.value)}
                />
                {errors.author && (
                  <span className="text-red-500 text-sm mt-1 ml-1 block">{errors.author}</span>
                )}
              </div>

              <div className="relative">
                <input
                  type="date"
                  className={`w-full p-3 md:p-4 rounded-xl shadow-sm text-gray-800 focus:ring-2 outline-none transition-all ${
                    errors.publicationDate 
                      ? "border-2 border-red-500 focus:ring-red-200" 
                      : "border-none focus:ring-blue-500"
                  }`}
                  value={publicationDate}
                  onChange={(e) => handleChange('publicationDate', e.target.value)}
                />
                 {errors.publicationDate && (
                  <span className="text-red-500 text-sm mt-1 ml-1 block">{errors.publicationDate}</span>
                )}
              </div>
            </div>

            <div className="md:col-span-1 h-auto flex flex-col">
              <label 
                className={`flex flex-col items-center justify-center w-full h-64 md:h-full min-h-[200px] bg-gray-300 rounded-xl cursor-pointer hover:opacity-90 transition-all overflow-hidden relative shadow-inner ${
                    errors.coverImage ? "border-2 border-red-500" : ""
                }`}
              >
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
                  <span className="text-white opacity-0 group-hover:opacity-100 font-bold bg-black/50 px-3 py-1 rounded-full text-sm">
                    {isEditMode ? "Alterar Capa" : "Adicionar Capa"}
                  </span>
                </div>
              </label>
               {errors.coverImage && (
                  <span className="text-red-500 text-sm mt-1 text-center block">{errors.coverImage}</span>
                )}
            </div>
          </div>

          <div className="mb-8">
            <textarea
              placeholder="Descrição/Sinopse"
              rows={6}
              className={`w-full p-3 md:p-4 rounded-xl shadow-sm text-gray-800 focus:ring-2 outline-none resize-none text-justify leading-relaxed transition-all ${
                errors.description 
                  ? "border-2 border-red-500 focus:ring-red-200" 
                  : "border-none focus:ring-blue-500"
              }`}
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
             {errors.description && (
                  <span className="text-red-500 text-sm mt-1 ml-1 block">{errors.description}</span>
              )}
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