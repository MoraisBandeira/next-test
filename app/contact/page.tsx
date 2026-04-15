'use client';

import { useState } from 'react';

export function TextName(props: { name?: string; label?: string; placeholder?: string }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const filtered = raw.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    setValue(filtered);
    setError(raw !== filtered ? 'Apenas letras são permitidas.' : '');
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name} className="text-sm font-medium">{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        type="text"
        placeholder={props.placeholder}
        value={value}
        onChange={handleChange}
        className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState<Record<string, string> | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result: Record<string, string> = {};
    data.forEach((value, key) => {
      result[key] = value instanceof File ? value.name || '(nenhum arquivo)' : value;
    });
    console.log('Dados do formulário:', result);
    setFormData(result);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 py-24">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2">Contato</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Formulário com todos os tipos de campos HTML.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* text */}
          <TextName label="Nome" name="name" placeholder="Seu nome" />

          {/* email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">E-mail (email)</label>
            <input id="email" name="email" type="email" placeholder="seu@email.com"
              className="input" />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">Senha (password)</label>
            <input id="password" name="password" type="password" placeholder="••••••••"
              className="input" />
          </div>

          {/* number */}
          <div className="flex flex-col gap-1">
            <label htmlFor="age" className="text-sm font-medium">Número (number)</label>
            <input id="age" name="age" type="number" placeholder="25" min={0} max={120}
              className="input" />
          </div>

          {/* tel */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm font-medium">Telefone (tel)</label>
            <input id="phone" name="phone" type="tel" placeholder="+55 (11) 99999-9999"
              className="input" />
          </div>

          {/* url */}
          <div className="flex flex-col gap-1">
            <label htmlFor="website" className="text-sm font-medium">Site (url)</label>
            <input id="website" name="website" type="url" placeholder="https://exemplo.com"
              className="input" />
          </div>

          {/* date */}
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-sm font-medium">Data (date)</label>
            <input id="date" name="date" type="date" className="input" />
          </div>

          {/* range */}
          <div className="flex flex-col gap-1">
            <label htmlFor="range" className="text-sm font-medium">Intervalo (range)</label>
            <input id="range" name="range" type="range" min={0} max={100} defaultValue={50}
              className="w-full accent-blue-600" />
          </div>

          {/* file */}
          <div className="flex flex-col gap-1">
            <label htmlFor="file" className="text-sm font-medium">Arquivo (file)</label>
            <input id="file" name="file" type="file"
              className="text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white file:cursor-pointer" />
          </div>

          {/* select */}
          <div className="flex flex-col gap-1">
            <label htmlFor="subject" className="text-sm font-medium">Assunto (select)</label>
            <select id="subject" name="subject" className="input">
              <option value="">Selecione...</option>
              <option value="support">Suporte</option>
              <option value="sales">Vendas</option>
              <option value="other">Outro</option>
            </select>
          </div>

          {/* radio */}
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium mb-1">Preferência de contato (radio)</legend>
            {['E-mail', 'Telefone', 'WhatsApp'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="contact_pref" value={opt.toLowerCase()}
                  className="accent-blue-600" />
                {opt}
              </label>
            ))}
          </fieldset>

          {/* checkbox */}
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium mb-1">Interesses (checkbox)</legend>
            {['Design', 'Desenvolvimento', 'Marketing'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" name="interests" value={opt.toLowerCase()}
                  className="accent-blue-600" />
                {opt}
              </label>
            ))}
          </fieldset>

          {/* textarea */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium">Mensagem (textarea)</label>
            <textarea id="message" name="message" rows={4} placeholder="Escreva sua mensagem..."
              className="input resize-none" />
          </div>

          {/* hidden */}
          <input type="hidden" name="source" value="contact-page" />

          <button type="submit"
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 transition-colors">
            Enviar
          </button>

        </form>

        {formData && (
          <div className="mt-8 rounded-lg border border-gray-200 dark:border-neutral-800 p-4">
            <h2 className="text-sm font-semibold mb-3">Dados enviados:</h2>
            <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-auto whitespace-pre-wrap">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
