import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UTXO Dealership',
  description: 'Market for fresh UTXOs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <head>
        <meta />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta content="ie=edge" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" />
        <title>UTXO Dealership</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.13.0/umd/popper.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.min.js"></script>
        <script src="https://unpkg.com/@cmdcode/tapscript@1.4.0"></script>
        <script src="https://bundle.run/noble-secp256k1@1.2.14"></script>
        <script src="https://bitcoincore.tech/apps/bitcoinjs-ui/lib/bitcoinjs-lib.js"></script>
        <script src="https://bundle.run/browserify-cipher@1.0.1"></script>
        <script src="/nostr.js"></script>
        <script src="/dealership.js"></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
