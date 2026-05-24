import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const EMPTY_FORM = {
  fullname: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: 'user',
  status: 'active',
};

function extractErrorMessage(error, fallback) {
  const data = error.response?.data;
  if (data?.message) return data.message;
  if (data?.errors) {
    const first = Object.values(data.errors)[0];
    return Array.isArray(first) ? first[0] : first;
  }
  return fallback;
}

export default function SuperadminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/users?page=${page}&search=${encodeURIComponent(search)}`);
      setUsers(res.data.data);
      setTotalPages(res.data.last_page || 1);
    } catch (err) {
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const roleBadgeClass = (role) => {
    if (role === 'superadmin') return 'bg-gg-gold/20 text-gg-charcoal';
    if (role === 'admin') return 'bg-gg-lavender/30 text-gg-charcoal';
    return 'bg-gg-beige text-gg-gray border border-gg-lavender/20';
  };

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditing(user);
    setForm({
      fullname: user.fullname || user.name || '',
      username: user.username || '',
      email: user.email || '',
      password: '',
      password_confirmation: '',
      role: user.role || 'user',
      status: user.status || 'active',
    });
    setFormError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);

    try {
      if (editing) {
        const payload = {
          fullname: form.fullname,
          username: form.username,
          email: form.email,
          role: form.role,
          status: form.status,
        };
        if (form.password) {
          payload.password = form.password;
          payload.password_confirmation = form.password_confirmation;
        }
        await axios.put(`/users/${editing.id}`, payload);
      } else {
        await axios.post('/users', form);
      }
      closeModal();
      await loadUsers();
    } catch (err) {
      setFormError(extractErrorMessage(err, 'Could not save user.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user "${user.username}"? This cannot be undone.`)) return;

    try {
      await axios.delete(`/users/${user.id}`);
      await loadUsers();
    } catch (err) {
      alert(extractErrorMessage(err, 'Could not delete user.'));
    }
  };

  const roleOptions =
    currentUser?.role === 'superadmin'
      ? [
          { value: 'superadmin', label: 'Superadmin' },
          { value: 'admin', label: 'Admin (Shop)' },
          { value: 'user', label: 'User (Customer)' },
        ]
      : [
          { value: 'admin', label: 'Admin (Shop)' },
          { value: 'user', label: 'User (Customer)' },
        ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl text-gg-charcoal">User Management</h2>
          <p className="text-sm text-gg-gray mt-1">
            Add, edit, delete, and view users. Only admins can access this module.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search name, email, username, role..."
            className="px-4 py-2.5 rounded-xl text-sm w-full sm:w-72 bg-gg-cream border border-gg-lavender/30 focus:outline-none focus:ring-2 focus:ring-gg-gold/30 text-gg-charcoal"
          />
          <button
            type="button"
            onClick={openCreate}
            className="px-5 py-2.5 rounded-xl bg-gg-charcoal text-gg-cream text-sm font-semibold hover:bg-gg-charcoal/90 transition shrink-0"
          >
            Add user
          </button>
        </div>
      </div>

      {loading ? (
        <div className="glass-card p-12 text-center text-gg-gray animate-pulse">Loading users...</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-gg-gray bg-gg-beige/60">
                <th className="p-4">Full name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Username</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gg-lavender/10 text-gg-charcoal">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gg-gray">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gg-lavender/5 transition-colors">
                    <td className="p-4 font-medium">{user.fullname || user.name}</td>
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
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          user.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status || 'active'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openEdit(user)}
                        className="text-xs font-semibold text-gg-gold hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(user)}
                        disabled={user.id === currentUser?.id}
                        className="text-xs font-semibold text-red-600 hover:underline disabled:opacity-40"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="p-4 border-t border-gg-lavender/20 flex items-center justify-between text-xs font-semibold">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-gg-cream border border-gg-lavender/20 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-gg-gray">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-gg-cream border border-gg-lavender/20 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gg-charcoal/40 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-display text-xl text-gg-charcoal mb-4">
              {editing ? 'Edit user' : 'Add user'}
            </h3>
            {formError && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {formError}
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm">
                <span className="text-gg-gray">Full name</span>
                <input
                  required
                  value={form.fullname}
                  onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-gg-lavender/30 bg-gg-cream"
                />
              </label>
              <label className="block text-sm">
                <span className="text-gg-gray">Username</span>
                <input
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-gg-lavender/30 bg-gg-cream"
                />
              </label>
              <label className="block text-sm">
                <span className="text-gg-gray">Email</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-gg-lavender/30 bg-gg-cream"
                />
              </label>
              <label className="block text-sm">
                <span className="text-gg-gray">
                  Password {editing && '(leave blank to keep current)'}
                </span>
                <input
                  type="password"
                  required={!editing}
                  minLength={8}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-gg-lavender/30 bg-gg-cream"
                />
              </label>
              {(!editing || form.password) && (
                <label className="block text-sm">
                  <span className="text-gg-gray">Confirm password</span>
                  <input
                    type="password"
                    required={!editing || !!form.password}
                    value={form.password_confirmation}
                    onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-gg-lavender/30 bg-gg-cream"
                  />
                </label>
              )}
              <label className="block text-sm">
                <span className="text-gg-gray">Role</span>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-gg-lavender/30 bg-gg-cream"
                >
                  {roleOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="text-gg-gray">Status</span>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="mt-1 w-full px-3 py-2 rounded-xl border border-gg-lavender/30 bg-gg-cream"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl border border-gg-lavender/30 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-gg-charcoal text-gg-cream text-sm font-semibold disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
