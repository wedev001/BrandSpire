import { useEffect, useMemo, useState } from 'react';
import PageHero from '../components/PageHero.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
const STORAGE_KEY = 'brandspire-admin-token';

function Badge({ label }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      {label}
    </span>
  );
}

function SummaryCard({ title, value, description }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}

function LeadCard({ submission, onOpen }) {
  const receivedAt = submission.receivedAt
    ? new Date(submission.receivedAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : 'Unknown';

  return (
    <article className="rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Lead</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{submission.name}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{submission.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge label={submission.projectType || 'No project type'} />
          <Badge label={submission.budget || 'No budget'} />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <p className="uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Phone</p>
          <p className="mt-3 font-medium">{submission.phone || 'Not provided'}</p>
        </div>
        <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <p className="uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Received</p>
          <p className="mt-3 font-medium">{receivedAt}</p>
        </div>
        <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <p className="uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Status</p>
          <p className="mt-3 font-medium text-emerald-600 dark:text-emerald-300">New inquiry</p>
        </div>
      </div>

      <div className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-300">{submission.message}</div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Minimal admin card</p>
        <button
          type="button"
          onClick={() => onOpen(submission)}
          className="rounded-3xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          View details
        </button>
      </div>
    </article>
  );
}

function AdminModal({ submission, editForm, isEditing, onEditField, onSave, onDelete, onClose, status }) {
  const receivedAt = submission.receivedAt
    ? new Date(submission.receivedAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : 'Unknown';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Lead detail</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">{submission.name}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{submission.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {isEditing ? (
              <button
                type="button"
                onClick={onSave}
                className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {status === 'saving' ? 'Saving...' : 'Save'}
              </button>
            ) : (
              <button
                type="button"
                onClick={onSave}
                className="rounded-3xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={onDelete}
              className="rounded-3xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              {status === 'deleting' ? 'Deleting...' : 'Delete'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-3xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Project type', field: 'projectType' },
            { label: 'Budget', field: 'budget' },
            { label: 'Phone', field: 'phone' },
            { label: 'Received', field: 'receivedAt', readOnly: true },
          ].map(({ label, field, readOnly }) => (
            <div key={field} className="rounded-[26px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{label}</p>
              {isEditing && !readOnly ? (
                <input
                  value={editForm?.[field] || ''}
                  onChange={(e) => onEditField(field, e.target.value)}
                  className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              ) : (
                <p className="mt-3 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {field === 'receivedAt' ? receivedAt : submission[field] || 'N/A'}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[26px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Message</p>
          {isEditing ? (
            <textarea
              value={editForm?.message || ''}
              onChange={(e) => onEditField('message', e.target.value)}
              rows={6}
              className="mt-3 w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          ) : (
            <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{submission.message}</p>
          )}
        </div>

        {status === 'error' && (
          <div className="mt-4 rounded-[26px] border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-700 dark:border-rose-500/50 dark:bg-rose-500/10 dark:text-rose-200">
            Something went wrong saving or deleting. Please retry.
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [modalStatus, setModalStatus] = useState('idle');

  useEffect(() => {
    if (selectedSubmission) {
      setEditForm({ ...selectedSubmission });
      setIsEditing(false);
      setModalStatus('idle');
    }
  }, [selectedSubmission]);

  async function fetchSubmissions(tokenValue) {
    setStatus('loading');
    setError('');

    try {
      const res = await fetch(`${API_BASE}/api/contact/submissions`, {
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': tokenValue || '',
        },
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || 'Unable to load submissions.');
      }

      setSubmissions(data.submissions || []);
      setIsUnlocked(true);
      setStatus('loaded');
    } catch (err) {
      setSubmissions([]);
      setIsUnlocked(false);
      setStatus('error');
      setError(err?.message || 'Unable to load submissions.');
    }
  }

  function handleTokenChange(event) {
    setToken(event.target.value);
    setError('');
  }

  async function handleAccessLeads() {
    if (!token.trim()) {
      setError('Enter your admin token before accessing leads.');
      setIsUnlocked(false);
      return;
    }

    localStorage.setItem(STORAGE_KEY, token);
    await fetchSubmissions(token);
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEY);
    setToken('');
    setSearch('');
    setSubmissions([]);
    setStatus('idle');
    setError('');
    setIsUnlocked(false);
    setSelectedSubmission(null);
  }

  async function handleSaveSubmission() {
    if (!selectedSubmission) return;
    setModalStatus('saving');
    try {
      const tokenValue = token || localStorage.getItem(STORAGE_KEY) || '';
      const res = await fetch(`${API_BASE}/api/contact/submissions/${selectedSubmission.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': tokenValue,
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.error || 'Save failed');

      setSubmissions((cur) => cur.map((item) => (item.id === selectedSubmission.id ? { ...item, ...editForm } : item)));
      setSelectedSubmission((item) => ({ ...item, ...editForm }));
      setIsEditing(false);
      setModalStatus('idle');
    } catch (err) {
      setModalStatus('error');
      console.error(err);
    }
  }

  async function handleDeleteSubmission() {
    if (!selectedSubmission) return;
    const confirmed = window.confirm('Delete this submission? This action cannot be undone.');
    if (!confirmed) return;

    setModalStatus('deleting');
    try {
      const tokenValue = token || localStorage.getItem(STORAGE_KEY) || '';
      const res = await fetch(`${API_BASE}/api/contact/submissions/${selectedSubmission.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': tokenValue,
        },
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data?.error || 'Delete failed');

      setSubmissions((cur) => cur.filter((item) => item.id !== selectedSubmission.id));
      setSelectedSubmission(null);
      setModalStatus('idle');
    } catch (err) {
      setModalStatus('error');
      console.error(err);
    }
  }

  function handleEditField(key, value) {
    setEditForm((current) => ({ ...current, [key]: value }));
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return submissions;
    return submissions.filter((item) =>
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.message?.toLowerCase().includes(query) ||
      item.projectType?.toLowerCase().includes(query) ||
      item.budget?.toLowerCase().includes(query)
    );
  }, [search, submissions]);

  const stats = useMemo(
    () => ({
      total: submissions.length,
      visible: filtered.length,
    }),
    [submissions.length, filtered.length]
  );

  return (
    <>
      <PageHero
        breadcrumb="Admin"
        title={<>Admin Console</>}
        subtitle="A minimal workspace for secure lead review with clean cards and simple actions."
      />

      <section className="max-w-app container-px pb-28">
        <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Access panel</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">Admin login</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Use your admin token to unlock the dashboard, search leads, and manage submissions.
            </p>

            <label className="mt-8 block text-sm font-semibold text-slate-900 dark:text-slate-100">
              Admin token
              <input
                type="password"
                value={token}
                onChange={handleTokenChange}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Enter admin token"
              />
            </label>

            {error ? (
              <div className="mt-5 rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
                {error}
              </div>
            ) : null}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAccessLeads}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Unlock
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
              >
                Sign out
              </button>
            </div>

            <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Session status</p>
              <p className="mt-2">
                {isUnlocked
                  ? 'Admin access is active. Lead cards are available below.'
                  : 'Dashboard is locked. Unlock to review submissions.'}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/95">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Overview</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">Minimal admin dashboard</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <SummaryCard title="Total leads" value={stats.total} description="Submissions loaded into the dashboard." />
                  <SummaryCard title="Visible" value={stats.visible} description="Results currently matching search." />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_320px] items-end">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Search leads</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Filter by name, email, project, or budget.</p>
                </div>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search leads..."
                  className="h-14 w-full min-w-0 rounded-3xl border border-slate-200 bg-slate-50 px-5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-600 dark:focus:ring-slate-700"
                />
              </div>
            </div>

            {!isUnlocked && status !== 'loading' && (
              <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
                <p className="font-semibold text-slate-900 dark:text-slate-100">Locked view</p>
                <p className="mt-3">Unlock the dashboard with your admin token to view and manage submissions.</p>
              </div>
            )}

            {status === 'loading' && (
              <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
                Loading submissions…
              </div>
            )}

            {isUnlocked && status === 'loaded' && filtered.length === 0 && (
              <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-6 text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-400">
                No leads match your search. Try a broader query or clear the search.
              </div>
            )}

            {isUnlocked && status === 'loaded' && filtered.length > 0 && (
              <div className="grid gap-5">
                {filtered.map((submission) => (
                  <LeadCard key={submission.id} submission={submission} onOpen={setSelectedSubmission} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedSubmission && (
        <AdminModal
          submission={selectedSubmission}
          editForm={editForm}
          isEditing={isEditing}
          onEditField={handleEditField}
          onSave={isEditing ? handleSaveSubmission : () => setIsEditing(true)}
          onDelete={handleDeleteSubmission}
          onClose={() => setSelectedSubmission(null)}
          status={modalStatus}
        />
      )}
    </>
  );
}
