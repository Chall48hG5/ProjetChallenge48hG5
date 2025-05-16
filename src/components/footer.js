import { Shield, Github, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Shield className="h-8 w-8 text-cyan-400 mr-2" />
            <span className="text-xl font-bold text-white">
              LYON<span className="text-cyan-400">2180</span>
            </span>
          </div>

          <div className="flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Accueil
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Alertes
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Activités
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              À propos
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2180 Lyon Protection System. Tous droits réservés.</p>

          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
