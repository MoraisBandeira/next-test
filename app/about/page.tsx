export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 py-24">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">Sobre nós</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          Somos uma equipe apaixonada por criar produtos digitais que fazem a
          diferença. Nossa missão é entregar experiências simples, rápidas e
          acessíveis para todos os usuários.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="rounded-lg border border-gray-200 dark:border-neutral-800 p-6">
            <h2 className="text-xl font-semibold mb-2">Missão</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Construir soluções que resolvam problemas reais com tecnologia
              moderna.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-neutral-800 p-6">
            <h2 className="text-xl font-semibold mb-2">Visão</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ser referência em qualidade e inovação no desenvolvimento web.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-neutral-800 p-6">
            <h2 className="text-xl font-semibold mb-2">Valores</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transparência, colaboração e foco na experiência do usuário.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
