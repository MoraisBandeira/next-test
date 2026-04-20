'use client';

import { useState } from 'react';

export function TextName(props: { name?: string; label?: string; placeholder?: string;}) {
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
        required={true}
        className={`input ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
export function EmailField(props: { name?: string; label?: string; placeholder?: string;}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name} className="text-sm font-medium">{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        type="email"
        placeholder={props.placeholder}
        required={true}
        className="input"
      />
    </div>
  );
}
export function PasswordField(props: { name?: string; label?: string; placeholder?: string;}) {
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function validate(password: string): string[] {
    const errs: string[] = [];
    if (password.length < 8) errs.push('Mínimo de 8 caracteres.');
    if (!/[0-9]/.test(password)) errs.push('Deve conter pelo menos um número.');
    if (!/[^a-zA-Z0-9]/.test(password)) errs.push('Deve conter pelo menos um caractere especial.');
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setValue(raw);
    setErrors(raw ? validate(raw) : []);
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name} className="text-sm font-medium">{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        type="password"
        placeholder={props.placeholder}
        value={value}
        onChange={handleChange}
        required={true}
        className={`input ${errors.length ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {errors.map((err) => (
        <span key={err} className="text-xs text-red-500">{err}</span>
      ))}
    </div>
  );
}
export function SelectField(props: {
  name?: string;
  label?: string;
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name} className="text-sm font-medium">{props.label}</label>
      <select
        id={props.name}
        name={props.name}
        required={true}
        className="input"
        onChange={(e) => props.onChange?.(e.target.value)}
      >
        <option value="">Selecione...</option>
        {props.options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}


export function RadioGroup(props: {
  legend: string;
  name: string;
  options: string[];
  onChange?: (value: string) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium mb-1">{props.legend}</legend>
      {props.options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="radio"
            name={props.name}
            value={opt.toLowerCase()}
            onChange={() => props.onChange?.(opt.toLowerCase())}
            className="accent-blue-600"
          />
          {opt}
        </label>
      ))}
    </fieldset>
  );
}

export function CheckboxGroup(props: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  onChange?: (selected: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  function handleChange(value: string, checked: boolean) {
    const next = checked ? [...selected, value] : selected.filter((v) => v !== value);
    setSelected(next);
    props.onChange?.(next);
  }

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium mb-1">{props.legend}</legend>
      {props.options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            name={props.name}
            value={opt.value}
            checked={selected.includes(opt.value)}
            onChange={(e) => handleChange(opt.value, e.target.checked)}
            className="accent-blue-600"
          />
          {opt.label}
        </label>
      ))}
    </fieldset>
  );
}

export function TextareaField(props: { name: string; label: string; placeholder?: string; rows?: number }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={props.name} className="text-sm font-medium">{props.label}</label>
      <textarea
        id={props.name}
        name={props.name}
        rows={props.rows ?? 4}
        placeholder={props.placeholder}
        className="input resize-none"
      />
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState<Record<string, string | string[]> | null>(null);
  const [selectedField, setSelectedField] = useState('');
  const [contactPref, setContactPref] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result: Record<string, string | string[]> = {};
    const seen = new Set<string>();

    data.forEach((_, key) => {
      if (seen.has(key)) return;
      seen.add(key);

      const all = data.getAll(key);
      if (all.length > 1) {
        result[key] = all.map((v) => (v instanceof File ? v.name || '(nenhum arquivo)' : v));
      } else {
        const v = all[0];
        result[key] = v instanceof File ? v.name || '(nenhum arquivo)' : v;
      }
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
          <EmailField label="E-mail" name="email" placeholder="seu@email.com" />

          {/* password */}
          <PasswordField label="Senha" name="password" placeholder="••••••••" />

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
          <SelectField
            label="switch de campos"
            name="country"
            options={[
              { value: 'br', label: 'campo-1' },
              { value: 'us', label: 'campo-2' },
              { value: 'uk', label: 'campo-3' },
            ]}
            onChange={setSelectedField}
          />

          {selectedField === 'br' && (
            <>
              <RadioGroup
                legend="Preferência de contato (radio)"
                name="contact_pref"
                options={['E-mail', 'Telefone', 'WhatsApp']}
                onChange={setContactPref}
              />
              {contactPref === 'whatsapp' && (
                <TextName name="whatsapp" label="Número do WhatsApp" placeholder="WhatsApp: (11) 99999-9999" />
              )}
            </>
          )}

          {selectedField === 'us' && (
            <CheckboxGroup
              legend="Interesses (checkbox)"
              name="interests"
              options={[
                { value: 'design', label: 'Design' },
                { value: 'desenvolvimento', label: 'Desenvolvimento' },
                { value: 'marketing', label: 'Marketing' },
              ]}
            />
          )}

          {selectedField === 'uk' && (
            <TextareaField
              name="message"
              label="Mensagem (textarea)"
              placeholder="Escreva sua mensagem..."
            />
          )}

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
