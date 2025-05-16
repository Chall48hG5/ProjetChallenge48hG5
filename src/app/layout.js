import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata = {
  title: "Lyon 2180 - Système d'Alerte",
  description: "Système d'alerte pour les catastrophes naturelles à Lyon en 2180",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-slate-900 text-white">
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
