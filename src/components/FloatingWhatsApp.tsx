import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        setIsVisible(footerRect.top > windowHeight - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.open("https://wa.me/6282221521043", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed right-8 bottom-8 z-40 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}`}
      aria-label="Contact via WhatsApp"
    >
      <div className="whatsapp-button group relative">
        <div className="bg-gold/20 p-3 rounded-full">
          <MessageCircle className="w-7 h-7 text-gold shrink-0" />
        </div>

        <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-30" />

        <div className="absolute -top-14 right-1/2 transform translate-x-1/2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <div className="bg-black text-gold text-sm font-semibold px-3 py-1.5 rounded-lg relative shadow-lg">
            Contact Now!
            <div className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rotate-45 shadow-lg"></div>
          </div>
        </div>
      </div>

      <style>{`
        .whatsapp-button {
          @apply relative w-16 h-16 rounded-full bg-gradient-gold shadow-gold;
          @apply flex items-center justify-center cursor-pointer;
          @apply hover:scale-110 hover:shadow-2xl transition-all duration-300;
        }
      `}</style>
    </button>
  );
};

export default FloatingWhatsApp;
