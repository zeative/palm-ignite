import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { ChevronDown, Sparkles } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip"; // ⬅️ Tambahan import

interface FooterProps {
  mobileMap?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ mobileMap }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-charcoal py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-24 py-5 mb-10 items-start">
          <div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-16 py-6 md:py-10 md:pl-16">
              <div className="flex flex-col gap-10 max-w-xl">
                <div>
                  <h1 className="text-3xl font-extrabold">Palmignite Charcoal</h1>
                  <p className="mt-4 text-gray-400 leading-relaxed">We are a trusted Indonesian charcoal exporter from Yogyakarta, delivering premium-quality charcoal that meets international standards.</p>
                </div>

                <div className="glass-card p-4 rounded-xl backdrop-blur-sm bg-card/40 border border-glass-border max-w-sm">
                  <h3 className="font-semibold text-foreground mb-4 text-sm"> Information</h3>

                  <div className="space-y-4">
                    <a href="mailto:info@palmignitetrade.com" className="flex items-start gap-3 group">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
                        <Mail className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground">Email</p>
                        <p className="text-sm font-medium group-hover:text-gold transition-colors">info@palmignitetrade.com</p>
                      </div>
                    </a>

                    <a href="https://instagram.com/palmignite.trade" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Instagram className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Instagram</p>
                        <p className="font-medium group-hover:text-gold transition-colors">@palmignite.trade</p>
                      </div>
                    </a>

                    <a href="https://wa.me/6282221521043" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Phone className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">WhatsApp</p>
                        <p className="font-medium group-hover:text-gold transition-colors">+62 822-2152-1043</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground">Location</p>
                        <p className="text-sm font-medium">Yogyakarta, Indonesia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <nav className="mt-6 md:mt-14 text-[15px] flex flex-col gap-y-2 md:gap-y-4 text-gray-500">
                <a href="#about" className="hover:text-gold transition-colors">
                  About Us
                </a>
                <a href="https://drive.google.com/drive/folders/1lCKQ2CY_7f2VKOeWnnzZzIF-zP9aFx0U?usp=drive_link" className="hover:text-gold transition-colors">
                  Legal & Certification
                </a>
                <a href="#product-specifications" className="hover:text-gold transition-colors">
                  Product Specifications
                </a>
                <a href="#terms-conditions" className="hover:text-gold transition-colors">
                  Terms & Conditions
                </a>
                <a href="#privacy-policy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="text-center flex flex-col items-center gap-1 py-2 md:py-4 bg-charcoal border-t border-border my-2 md:my-5">
          <p className="font-[Onest] text-sm text-muted-foreground">
            © 2025
            <span onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })} className="hover:underline cursor-pointer">
              {" "}
              Palmignite Charcoal Trade
            </span>{" "}
            — All Rights Reserved.
          </p>

          <p className="font-[Onest] text-sm text-muted-foreground flex items-center gap-1">
            Designed & Built by
            <Tooltip.Provider delayDuration={150}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a href="https://instagram.com/mhmdikhsxn" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">
                    {" "}
                    SXNDev
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content side="bottom" sideOffset={8} className="bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md animate-fadeIn">
                    Follow Developer!
                    <Tooltip.Arrow className="fill-black/90" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
