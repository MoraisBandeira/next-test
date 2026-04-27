import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

// Demo credentials — substitua por consulta ao banco de dados em produção
const USERS = [
  { id: '1', email: 'admin@example.com', password: 'admin123', name: 'Admin' },
]

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const user = USERS.find((u) => u.email === email && u.password === password)
  if (!user) {
    return NextResponse.json({ error: 'E-mail ou senha incorretos. Verifique suas credenciais.' }, { status: 401 })
  }

  const token = await signToken({ sub: user.id, name: user.name, email: user.email })

  const response = NextResponse.json({ success: true })
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
    path: '/',
  })

  return response
}
