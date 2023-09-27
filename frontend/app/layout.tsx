import "./globals.css";
import { Inter } from 'next/font/google'
import QueryProvider from "@/providers/QueryProvider";
import ReduxProvider from "@/redux/provider";

const inter = Inter({ 
  subsets: ['latin'] ,
  preload: true,
})

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
  icon: '/favicon.ico',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="" lang="en">
      <body className={`${inter.className} h-screen bg-bg bg-cover bg-no-repeat text-center text-white`}>
      
      <ReduxProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </ReduxProvider>
      </body>
    </html>
  )
}