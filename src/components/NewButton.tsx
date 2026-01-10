import type { FC } from "react";

interface NewButtonProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

export const NewButton: FC<NewButtonProps> = ({ setIsModalOpen }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900">Livros</h1>
      <button
        className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        Novo
      </button>
    </div>
  );
};
