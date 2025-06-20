import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Bengle',
    description:
        'A wordle-like game where users guess a Cincinnati Bengals draft pick.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <title>Bengle</title>
                <meta />
            </head>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    )
}
