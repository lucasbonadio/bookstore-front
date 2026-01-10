export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
      <span className="mt-4 text-gray-500 font-medium text-sm">
        Carregando...
      </span>
    </div>
  );
};