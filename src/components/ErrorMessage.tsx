interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center h-64 w-full px-4">
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg shadow-sm text-center max-w-md">
        <strong className="block font-bold mb-1">Ops! Ocorreu um erro</strong>
        <span>{message}</span>
      </div>
    </div>
  );
};