import { Montserrat } from 'next/font/google';

const Mont = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
 return (
    <html lang="en" className={Mont.className}>
      <body>{children}</body>
    </html>
  )
}
