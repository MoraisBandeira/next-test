 export function TextName(){
    return (<div className="flex flex-col gap-1">
      <label htmlFor="name" className="text-sm font-medium">Texto (text)</label>
      <input id="name" type="text" placeholder="Seu nome"
        className="input" />
    </div>
    )
  }
export default function ContactPage() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 py-24">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2">Contato</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Formulário com todos os tipos de campos HTML.
        </p>

        <form className="flex flex-col gap-6">

          {/* text */}
          <TextName />

          {/* email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">E-mail (email)</label>
            <input id="email" type="email" placeholder="seu@email.com"
              className="input" />
          </div>

          {/* password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">Senha (password)</label>
            <input id="password" type="password" placeholder="••••••••"
              className="input" />
          </div>

          {/* number */}
          <div className="flex flex-col gap-1">
            <label htmlFor="age" className="text-sm font-medium">Número (number)</label>
            <input id="age" type="number" placeholder="25" min={0} max={120}
              className="input" />
          </div>

          {/* tel */}
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="text-sm font-medium">Telefone (tel)</label>
            <input id="phone" type="tel" placeholder="+55 (11) 99999-9999"
              className="input" />
          </div>

          {/* url */}
          <div className="flex flex-col gap-1">
            <label htmlFor="website" className="text-sm font-medium">Site (url)</label>
            <input id="website" type="url" placeholder="https://exemplo.com"
              className="input" />
          </div>

          {/* search */}
          <div className="flex flex-col gap-1">
            <label htmlFor="search" className="text-sm font-medium">Busca (search)</label>
            <input id="search" type="search" placeholder="Pesquisar..."
              className="input" />
          </div>

          {/* date */}
          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-sm font-medium">Data (date)</label>
            <input id="date" type="date" className="input" />
          </div>

          {/* datetime-local */}
          <div className="flex flex-col gap-1">
            <label htmlFor="datetime" className="text-sm font-medium">Data e hora (datetime-local)</label>
            <input id="datetime" type="datetime-local" className="input" />
          </div>

          {/* time */}
          <div className="flex flex-col gap-1">
            <label htmlFor="time" className="text-sm font-medium">Hora (time)</label>
            <input id="time" type="time" className="input" />
          </div>

          {/* month */}
          <div className="flex flex-col gap-1">
            <label htmlFor="month" className="text-sm font-medium">Mês (month)</label>
            <input id="month" type="month" className="input" />
          </div>

          {/* week */}
          <div className="flex flex-col gap-1">
            <label htmlFor="week" className="text-sm font-medium">Semana (week)</label>
            <input id="week" type="week" className="input" />
          </div>

          {/* color */}
          <div className="flex flex-col gap-1">
            <label htmlFor="color" className="text-sm font-medium">Cor (color)</label>
            <input id="color" type="color" defaultValue="#3b82f6"
              className="h-10 w-16 cursor-pointer rounded border border-gray-300 dark:border-neutral-700 bg-transparent p-1" />
          </div>

          {/* range */}
          <div className="flex flex-col gap-1">
            <label htmlFor="range" className="text-sm font-medium">Intervalo (range)</label>
            <input id="range" type="range" min={0} max={100} defaultValue={50}
              className="w-full accent-blue-600" />
          </div>

          {/* file */}
          <div className="flex flex-col gap-1">
            <label htmlFor="file" className="text-sm font-medium">Arquivo (file)</label>
            <input id="file" type="file"
              className="text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white file:cursor-pointer" />
          </div>

          {/* select */}
          <div className="flex flex-col gap-1">
            <label htmlFor="subject" className="text-sm font-medium">Assunto (select)</label>
            <select id="subject" className="input">
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
                <input type="checkbox" value={opt.toLowerCase()}
                  className="accent-blue-600" />
                {opt}
              </label>
            ))}
          </fieldset>

          {/* textarea */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium">Mensagem (textarea)</label>
            <textarea id="message" rows={4} placeholder="Escreva sua mensagem..."
              className="input resize-none" />
          </div>

          {/* hidden */}
          <input type="hidden" name="source" value="contact-page" />

          <button type="submit"
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 transition-colors">
            Enviar
          </button>

        </form>
      </div>
    </main>
  );
}
