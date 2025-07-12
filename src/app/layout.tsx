import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Bengle',
    description:
        'A wordle-like game where users guess a Cincinnati Bengals draft pick!',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
