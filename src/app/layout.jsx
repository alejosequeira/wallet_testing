
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/1navBar/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wallet Testing',
  description: 'Wallet Testing',
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="32x32" href="/"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;900&family=Roboto+Mono:wght@400;900&family=Roboto:wght@400;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
          <NavBar />
        {children}
      </body>
    </html>
  )
}
