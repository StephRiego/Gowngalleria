import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SuperadminAudit() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await axios.get(`/activity-logs?page=${page}`);
        if (!cancelled) {
          setLogs(res.data.data || []);
          setTotalPages(res.data.last_page || 1);
        }
      } catch (err) {
        console.error('Error loading activity logs:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl text-gg-charcoal">Audit Trail</h2>
        <p className="text-sm text-gg-gray mt-1">
          Login, logout, failed attempts, and user management activities (accounting / AAA).
        </p>
      </div>

      {loading ? (
        <div className="glass-card p-12 text-center text-gg-gray animate-pulse">Loading audit logs...</div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-gg-gray bg-gg-beige/60">
                <th className="p-4">Timestamp</th>
                <th className="p-4">User</th>
                <th className="p-4">Activity</th>
                <th className="p-4">Details</th>
                <th className="p-4">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gg-lavender/10 text-gg-charcoal">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gg-gray">
                    No activity recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gg-lavender/5 transition-colors">
                    <td className="p-4 text-gg-gray whitespace-nowrap">
                      {log.timestamp ? new Date(log.timestamp).toLocaleString() : '—'}
                    </td>
                    <td className="p-4">
                      {log.user ? (
                        <span>
                          {log.user.fullname || log.user.username}
                          <span className="block text-xs text-gg-gray">{log.user.email}</span>
                        </span>
                      ) : (
                        <span className="text-gg-gray">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gg-lavender/25">
                        {log.activity}
                      </span>
                    </td>
                    <td className="p-4 text-gg-gray max-w-xs truncate">{log.description || '—'}</td>
                    <td className="p-4 text-gg-gray text-xs">{log.ip_address || '—'}</td>
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
              className="px-4 py-2 rounded-xl bg-gg-cream border border-gg-lavender/20 disabled:opacity-40"
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
              className="px-4 py-2 rounded-xl bg-gg-cream border border-gg-lavender/20 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
