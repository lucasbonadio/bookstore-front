interface DeleteBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteBookModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteBookModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#f2f2f2] rounded-3xl shadow-2xl w-full max-w-md p-8 transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Tem certeza?
        </h2>
        <p className="text-center text-gray-700 text-lg mb-8 leading-relaxed">
          Ao excluir este livro não será possível recuperá-lo. Realmente deseja
          excluí-lo?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-full transition-colors text-lg min-w-[140px]"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-8 py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white font-semibold rounded-full transition-colors text-lg min-w-[140px]"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};
