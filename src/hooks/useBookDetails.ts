import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useBook } from "./useBook";
import { deleteBook } from "../services/api";

export const useBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { book, loading, error, refetch } = useBook(Number(id));

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleEditSuccess = () => {
    refetch();
  };

  const handleConfirmDelete = async () => {
    if (!book) return;
    try {
      const message = await deleteBook(book.id);
      setIsDeleteModalOpen(false);
      toast.success(message);
      navigate("/")
    } catch {
      setIsDeleteModalOpen(false);
      toast.error("Erro ao excluir o livro.");
    }
  };

  const handleBack = () => navigate(-1);

  return {
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
  };
};
