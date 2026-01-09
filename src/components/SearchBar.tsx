interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="mb-8 relative">
      <input
        type="text"
        placeholder="Buscar por título ou autor"
        className="w-full p-4 pl-4 rounded-lg border-none shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="absolute right-4 top-4 text-gray-400">🔍</span>
    </div>
  );
};