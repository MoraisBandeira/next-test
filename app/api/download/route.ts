import { NextResponse } from 'next/server';

const PDF_URL = 'https://www.africau.edu/images/default/sample.pdf';

export async function GET() {
  const upstream = await fetch(PDF_URL);

  if (!upstream.ok) {
    return NextResponse.json({ error: 'Falha ao buscar o arquivo.' }, { status: 502 });
  }

  const buffer = await upstream.arrayBuffer();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="sample.pdf"',
      'Content-Length': String(buffer.byteLength),
    },
  });
}
