import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Aprende Jugando - Educación Interactiva para Niños',
  description: 'App educativa interactiva para niños con módulos de matemáticas, arte y ciencias',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased ${_geist.className}`}> 
        {/* Skip link for keyboard users */}
        <a href="#content" className="sr-only-focusable">Ir al contenido</a>

        {/* TODO: import and render Navbar here when available */}

        <main id="content" className="min-h-screen">
          {children}
        </main>

        <Analytics />
      </body>
    </html>
  )
}

/* Utility: visually-hidden but focusable */
/* Add to globals.css or keep here for quick reference */
.sr-only-focusable {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.sr-only-focusable:focus, .sr-only-focusable:active {
  position: static;
  left: 0;
  width: auto;
  height: auto;
  margin: 8px;
  padding: 8px 12px;
  background: #fff;
  color: #000;
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
}
