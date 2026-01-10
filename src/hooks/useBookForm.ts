import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { createBook, updateBook } from "../services/api";
import type { Book } from "../types/Book";

interface UseBookFormProps {
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

export const useBookForm = ({ isOpen, onClose, onSuccess, bookToEdit }: UseBookFormProps) => {
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
        setPublicationDate(bookToEdit.publicationDate ? new Date(bookToEdit.publicationDate).toISOString().split("T")[0] : "");
        setPreview(bookToEdit.coverImage ? `data:image/jpeg;base64,${bookToEdit.coverImage}` : null);
      } else {
        resetForm();
      }
      setImageFile(null);
    }
  }, [isOpen, bookToEdit]);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setPublicationDate("");
    setPreview(null);
  };

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};
    if (!title.trim()) newErrors.title = "O título é obrigatório.";
    if (!author.trim()) newErrors.author = "O autor é obrigatório.";
    if (!publicationDate) newErrors.publicationDate = "A data é obrigatória.";
    if (!description.trim()) newErrors.description = "A descrição é obrigatória.";
    if (!isEditMode && !imageFile) newErrors.coverImage = "A capa é obrigatória.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ValidationErrors, value: string) => {
    if (field === "title") setTitle(value);
    if (field === "author") setAuthor(value);
    if (field === "publicationDate") setPublicationDate(value);
    if (field === "description") setDescription(value);
    
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      if (errors.coverImage) setErrors((prev) => ({ ...prev, coverImage: undefined }));
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
      if (publicationDate) formData.append("publicationDate", publicationDate);
      if (imageFile) formData.append("coverImage", imageFile);

      if (isEditMode) {
        await updateBook(bookToEdit.id, formData);
        toast.success("Livro atualizado!");
      } else {
        await createBook(formData);
        toast.success("Livro criado!");
      }
      onSuccess();
      onClose();
    } catch {
      toast.error("Erro ao salvar o livro.");
    } finally {
      setLoading(false);
    }
  };

  return {
    title, author, publicationDate, description, preview, loading, errors, isEditMode,
    handleChange, handleImageChange, handleSubmit
  };
};