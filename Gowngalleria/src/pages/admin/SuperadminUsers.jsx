import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SuperadminUsers() {
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
        console.error('Error loading users:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, search]);

  const roleBadgeClass = (role) => {
    if (role === 'superadmin') return 'bg-gg-gold/20 text-gg-charcoal';
    if (role === 'admin') return 'bg-gg-lavender/30 text-gg-charcoal';
    return 'bg-gg-beige text-gg-gray border border-gg-lavender/20';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-gg-charcoal">User Management</h2>
          <p className="text-sm text-gg-gray mt-1">
            Manage all users — shop admins and customers — across the system.
          </p>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setLoading(true);
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search name, email, username, role..."
          className="px-4 py-2.5 rounded-xl text-sm w-full md:w-80 bg-gg-cream border border-gg-lavender/30 focus:outline-none focus:ring-2 focus:ring-gg-gold/30 text-gg-charcoal"
        />
      </div>

      {loading ? (
        <div className="glass-card p-12 text-center text-gg-gray animate-pulse">Loading users...</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-gg-gray bg-gg-beige/60">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Username</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gg-lavender/10 text-gg-charcoal">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gg-gray">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gg-lavender/5 transition-colors">
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-gg-gray">{user.email}</td>
                    <td className="p-4 text-gg-gray">{user.username}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${roleBadgeClass(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block ring-4 ring-emerald-100" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="p-4 border-t border-gg-lavender/20 flex items-center justify-between text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setPage((p) => Math.max(p - 1, 1));
              }}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-gg-cream border border-gg-lavender/20 disabled:opacity-40 hover:shadow-soft transition"
            >
              Previous
            </button>
            <span className="text-gg-gray">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setPage((p) => Math.min(p + 1, totalPages));
              }}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-gg-cream border border-gg-lavender/20 disabled:opacity-40 hover:shadow-soft transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
