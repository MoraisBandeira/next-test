import Link from 'next/link'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import LogoutButton from './LogoutButton'

export default async function Navbar() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const user = token ? await verifyToken(token) : null

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
            href="https://file-examples.com/wp-content/storage/2017/02/file_example_XLS_10.xls"
            className="flex items-center gap-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 transition-colors"
            download
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
            </svg>
            Excel
          </a>
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
        {user && (
          <>
            <li className="text-gray-500 dark:text-gray-400">
              {user.name}
            </li>
            <li>
              <LogoutButton />
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
