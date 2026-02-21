import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI News Daily',
  description: 'Ежедневная подборка новостей про искусственный интеллект',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
