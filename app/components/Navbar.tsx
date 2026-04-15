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
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
