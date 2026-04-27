import { SignJWT, jwtVerify } from 'jose'

export type JWTPayload = {
  sub: string
  name: string
  email: string
}

function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-change-in-production'
  )
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}
