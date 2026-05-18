import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function SuperadminUsers() {
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await axios.get(`/users?page=${page}&search=${search}`);
        if (!cancelled) {
          setUsers(res.data.data);
          setTotalPages(res.data.last_page || 1);
        }
      } catch (err) {
        console.error('Error syncing account orchestration views:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, search]);

  return (
    <div className="p-8 bg-luxury-white min-h-screen text-left">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-luxury-muted/20 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-serif text-luxury-black tracking-tight">Account Orchestration</h1>
          <p className="text-sm text-luxury-muted mt-1">Superadmin profile clearance desk.</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3 sm:items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setLoading(true);
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search operator name or role..."
            className="px-4 py-2 border border-luxury-muted/20 rounded text-sm w-full md:w-64 bg-luxury-beige/30 focus:outline-none focus:border-luxury-brown text-luxury-black"
          />
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 rounded text-sm bg-luxury-brown text-luxury-white hover:bg-luxury-brown-dark transition whitespace-nowrap"
          >
            Log out
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-luxury-muted animate-pulse">Parsing database matrix...</div>
      ) : (
        <div className="bg-white border border-luxury-muted/10 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-luxury-black text-luxury-white text-xs tracking-wider uppercase">
                <th className="p-4">Identified Member</th>
                <th className="p-4">Email Connection</th>
                <th className="p-4">Clearance Role</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-muted/10 text-sm text-luxury-black">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-luxury-muted">No records match configuration parameters.</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-luxury-beige/20 transition-colors">
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-luxury-muted">{user.email}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block ring-4 ring-emerald-100"></span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="p-4 bg-luxury-beige/10 border-t border-luxury-muted/10 flex items-center justify-between text-xs font-semibold tracking-wider text-luxury-black">
            <button
              onClick={() => {
                setLoading(true);
                setPage((p) => Math.max(p - 1, 1));
              }}
              disabled={page === 1}
              className="px-4 py-2 bg-white border border-luxury-muted/20 rounded disabled:opacity-40 uppercase hover:bg-luxury-beige transition-all"
            >
              Previous Set
            </button>
            <span className="text-luxury-muted">Page {page} of {totalPages}</span>
            <button
              onClick={() => {
                setLoading(true);
                setPage((p) => Math.min(p + 1, totalPages));
              }}
              disabled={page === totalPages}
              className="px-4 py-2 bg-white border border-luxury-muted/20 rounded disabled:opacity-40 uppercase hover:bg-luxury-beige transition-all"
            >
              Next Set
            </button>
          </div>
        </div>
      )}
    </div>
  );
}