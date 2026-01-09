import type { Book } from '../types/Book';

interface BookCardProps {
  book: Book;
}

export const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="h-64 overflow-hidden bg-gray-200 flex items-center justify-center relative">
        {book.coverImage ? (
          <img 
            src={`data:image/jpeg;base64,${book.coverImage}`} 
            alt={book.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Sem Capa</span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h2>
        <p className="text-sm text-gray-600 font-semibold mb-2">{book.author}</p>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {book.description || "Sem descrição."}
        </p>
      </div>
    </div>
  );
};