'use client';

import { useEffect, useRef, useState } from 'react';
import { User } from '../types/User.type';
import GetRequest from '../api/GetRequest';
import { ToastContainer, ToastData } from '../components/Toast';


export function EditModal({
  user,
  onSave,
  onClose,
}: {
  user: User;
  onSave: (updated: User) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState(user);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-neutral-900 shadow-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 id="modal-title" className="text-lg font-semibold">Editar usuário</h2>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {(['name', 'email', 'role'] as const).map((field, i) => (
            <div key={field} className="flex flex-col gap-1">
              <label htmlFor={`edit-${field}`} className="text-sm font-medium capitalize">
                {field === 'role' ? 'Site' : field === 'email' ? 'E-mail' : 'Nome'}
              </label>
              <input
                ref={i === 0 ? firstInputRef : undefined}
                id={`edit-${field}`}
                type={field === 'email' ? 'email' : 'text'}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="input border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 dark:border-neutral-700 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const PAGE_SIZE = 5;

export function Pagination({
  total,
  page,
  pageSize,
  onChange,
}: {
  total: number;
  page: number;
  pageSize: number;
  onChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Paginação" className="flex items-center justify-between mt-4 text-sm">
      <span className="text-gray-500">
        Página {page} de {totalPages}
      </span>
      <div className="flex gap-1">
        <button
          onClick={() => onChange(1)}
          disabled={page === 1}
          aria-label="Primeira página"
          className="px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
        >
          «
        </button>
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Página anterior"
          className="px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-label={`Página ${p}`}
            aria-current={p === page ? 'page' : undefined}
            className={`px-3 py-1 rounded border transition-colors ${
              p === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Próxima página"
          className="px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
        >
          ›
        </button>
        <button
          onClick={() => onChange(totalPages)}
          disabled={page === totalPages}
          aria-label="Última página"
          className="px-2 py-1 rounded border border-gray-200 dark:border-neutral-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
        >
          »
        </button>
      </div>
    </nav>
  );
}

export default function TablePage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  function addToast(message: string, type: ToastData['type'] = 'success') {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  }

  function removeToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  useEffect(() => {
    GetRequest<User[]>('/users')
      .then((users) => {
        if (!Array.isArray(users)) {
          addToast('Resposta da API inesperada', 'error');
          return;
        }
        setData(
          users.map((u: User) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            website: u.website,
          }))
        );
      })
      .finally(() => setLoading(false));
    
  }, []);

  const paginated = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSave(updated: User) {
    setData((prev) => prev.map((row) => (row.id === updated.id ? updated : row)));
    setEditing(null);
    addToast(`Usuário "${updated.name}" atualizado com sucesso.`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 py-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Usuários</h1>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-500" role="status" aria-label="Carregando">
            <svg className="animate-spin h-6 w-6 mr-3 text-blue-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Carregando...
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400" role="status" aria-label="Sem dados">
            <svg className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">Nenhum dado encontrado.</p>
          </div>
        ) : (
          <>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-neutral-800">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-600 dark:text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">E-mail</th>
                  <th className="px-4 py-3">Site</th>
                  <th className="px-4 py-3 sr-only">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                {paginated.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-neutral-900 transition-colors">
                    <td className="px-4 py-3 text-gray-400">{row.id}</td>
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3 text-gray-500">{row.email}</td>
                    <td className="px-4 py-3 text-gray-500">{row.website}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setEditing(row)}
                        aria-label={`Editar ${row.name}`}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            total={data.length}
            page={page}
            pageSize={PAGE_SIZE}
            onChange={setPage}
          />
          </>
        )}
      </div>

      {editing && (
        <EditModal
          user={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </main>
  );
}
