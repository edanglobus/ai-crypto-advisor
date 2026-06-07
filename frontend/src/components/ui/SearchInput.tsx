import { Search } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({ className = '', ...rest }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        className={`w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 ${className}`}
        {...rest}
      />
    </div>
  );
}
