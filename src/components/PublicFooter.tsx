import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "@/assets/logo_Thermodmr.webp";

const PublicFooter = () => (
  <footer className="bg-[hsl(0,0%,8%)] py-12 sm:py-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <img src={logo} alt="ThermoDMR" className="h-10 object-contain brightness-0 invert opacity-90" />
          <p className="text-sm text-white/40 leading-relaxed">
            Produciamo serramenti di alta qualità con profilo tedesco.
            Design, isolamento e il miglior prezzo di mercato.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="#" className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white/50 hover:bg-[hsl(195,85%,45%)] hover:text-white transition-all">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white/50 hover:bg-[hsl(195,85%,45%)] hover:text-white transition-all">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white/50 hover:bg-[hsl(195,85%,45%)] hover:text-white transition-all">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Prodotti */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider">Prodotti</h4>
          <div className="space-y-2 text-sm text-white/40">
            <Link to="/prodotti-pubblico" className="block hover:text-[hsl(195,85%,55%)] transition-colors">Finestre in PVC</Link>
            <Link to="/prodotti/portoncini" className="block hover:text-[hsl(195,85%,55%)] transition-colors">Portoncini</Link>
            <Link to="/prodotti/cassonetti" className="block hover:text-[hsl(195,85%,55%)] transition-colors">Cassonetti</Link>
            <Link to="/prodotti/tapparelle" className="block hover:text-[hsl(195,85%,55%)] transition-colors">Tapparelle</Link>
            <Link to="/prodotti/persiane" className="block hover:text-[hsl(195,85%,55%)] transition-colors">Persiane</Link>
          </div>
        </div>

        {/* Contatti */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider">Contatti</h4>
          <div className="space-y-3">
            <a href="tel:+390000000000" className="flex items-center gap-2 text-sm text-white/40 hover:text-[hsl(195,85%,55%)] transition-colors">
              <Phone className="h-4 w-4 shrink-0" />
              +39 000 000 0000
            </a>
            <a href="mailto:info@thermodmr.it" className="flex items-center gap-2 text-sm text-white/40 hover:text-[hsl(195,85%,55%)] transition-colors">
              <Mail className="h-4 w-4 shrink-0" />
              info@thermodmr.it
            </a>
            <div className="flex items-start gap-2 text-sm text-white/40">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Via dell'Industria, 00<br />00000 Città (PR)</span>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider">Link Utili</h4>
          <div className="space-y-2">
            <Link to="/auth" className="block text-sm text-white/40 hover:text-[hsl(195,85%,55%)] transition-colors">
              Area Riservata Rivenditori
            </Link>
            <Link to="/chi-siamo" className="block text-sm text-white/40 hover:text-[hsl(195,85%,55%)] transition-colors">
              Chi Siamo
            </Link>
            <Link to="/contatti" className="block text-sm text-white/40 hover:text-[hsl(195,85%,55%)] transition-colors">
              Contattaci
            </Link>
            <Link to="/diventa-rivenditore" className="block text-sm text-white/40 hover:text-[hsl(195,85%,55%)] transition-colors">
              Diventa Rivenditore
            </Link>
          </div>
          <div className="pt-4">
            <p className="text-xs text-white/25">P.IVA: 00000000000</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 text-center">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} ThermoDMR. Tutti i diritti riservati.
        </p>
      </div>
    </div>
  </footer>
);

export default PublicFooter;
