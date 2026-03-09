import { MessageCircle } from "lucide-react";

const WhatsAppFloating = () => (
  <a
    href="https://wa.me/390000000000?text=Ciao%2C%20vorrei%20informazioni%20sui%20vostri%20serramenti"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contattaci su WhatsApp"
    className="md:hidden fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center active:scale-95 transition-transform"
    style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
  >
    <MessageCircle className="h-7 w-7" />
  </a>
);

export default WhatsAppFloating;
