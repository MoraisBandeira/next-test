import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-200 dark:border-neutral-800 bg-white dark:bg-zinc-900">
      <Link href="/" className="text-xl font-bold tracking-tight">
        MyApp
      </Link>
      <ul className="flex items-center gap-6 text-sm font-medium">
        <li>
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/table" className="hover:text-blue-600 transition-colors">
            Table
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </li>
        <li>
          <a
            href="/api/download"
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            PDF
          </a>
        </li>
      </ul>
    </nav>
  );
}
