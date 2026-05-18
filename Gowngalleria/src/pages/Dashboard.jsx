import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-luxury-beige p-8">
      <div className="max-w-2xl mx-auto bg-luxury-white border border-luxury-muted/20 rounded-2xl shadow-sm p-8">
        <h1 className="font-display text-3xl text-luxury-brown-dark">Welcome, {user?.name}</h1>
        <p className="text-luxury-muted mt-2 text-sm">
          You are signed in as <span className="font-medium text-luxury-black">{user?.role}</span>.
        </p>
        <button
          type="button"
          onClick={logout}
          className="mt-6 px-5 py-2 rounded-lg bg-luxury-brown text-luxury-white text-sm font-medium hover:bg-luxury-brown-dark transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
