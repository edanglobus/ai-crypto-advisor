import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../../store/auth.store';
import { useLogout } from '../../../hooks/useAuth';

export function NewsletterMasthead() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleLogout = () => {
    logout.mutate(undefined, { onSettled: () => navigate('/login', { replace: true }) });
  };

  return (
    <header>
      <div className="flex justify-end gap-4">
        <Link
          to="/settings"
          className="text-xs font-medium text-slate-400 transition-colors hover:text-slate-700"
        >
          Settings
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="text-xs font-medium text-slate-400 transition-colors hover:text-slate-700"
        >
          Log out
        </button>
      </div>

      <div className="mt-2 text-center">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          AI Crypto Advisor
        </h1>
        <p className="mt-3 text-base text-slate-500">
          {today}
          {user?.name ? ` · curated for ${user.name}` : ''}
        </p>
      </div>

      <div className="mt-6 border-t-2 border-slate-900" />
    </header>
  );
}
