import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const langBtnRef = useRef<HTMLButtonElement>(null);
  const [langPos, setLangPos] = useState({ top: 0, right: 0 });

  const { language, setLanguage, t } = useLanguage();

  const menuItems = ["home", "about", "products", "export", "gallery", "contact"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initObserver = () => {
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    menuItems.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
  };

  useEffect(() => {
    initObserver();
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!navRef.current || !underlineRef.current) return;

    const activeBtn = navRef.current.querySelector<HTMLButtonElement>(`[data-id="${activeSection}"]`);
    if (!activeBtn) return;

    const navRect = navRef.current.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    underlineRef.current.style.width = `${btnRect.width}px`;
    underlineRef.current.style.transform = `translateX(${btnRect.left - navRect.left}px) scaleX(1)`;
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    observerRef.current?.disconnect();
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);

    setTimeout(initObserver, 1000);
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "id", name: "Bahasa Indonesia" },
    { code: "ko", name: "한국어" },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-colors duration-200 ${isScrolled ? "bg-charcoal/85 backdrop-blur shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div onClick={() => scrollToSection("home")} className="cursor-pointer flex items-center gap-3">
              <img src="/web-app-manifest-192x192.png" className="w-8 rounded-full" />
              <h1 className="text-gold font-bold text-xl hidden lg:block">Palmignite Charcoal</h1>
              <h1 className="text-gold font-bold text-xl lg:hidden">Palmignite Charcoal</h1>
            </div>

            <div ref={navRef} className="relative hidden md:flex items-center gap-4">
              {menuItems.map((id) => (
                <button key={id} data-id={id} onClick={() => scrollToSection(id)} className={`nav-link ${activeSection === id ? "nav-active" : ""}`}>
                  {t(`nav.${id}`)}
                </button>
              ))}
              <span ref={underlineRef} className="nav-underline" />
            </div>

            <div className="hidden md:block">
              <button
                ref={langBtnRef}
                onClick={() => {
                  if (!langBtnRef.current) return;
                  const rect = langBtnRef.current.getBoundingClientRect();

                  setLangPos({
                    top: rect.bottom + 8,
                    right: window.innerWidth - rect.right,
                  });

                  setShowLangDropdown((prev) => !prev);
                }}
                className="nav-link flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gold">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {showLangDropdown && (
        <div
          className="hidden md:block fixed z-[9999] w-48 bg-charcoal/85 border border-border rounded-lg overflow-hidden shadow-xl"
          style={{ top: langPos.top, right: langPos.right }}
        >
          {languages.map((lang, index) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as any);
                setShowLangDropdown(false);
              }}
              className="block w-full text-left px-4 py-3.5 text-sm hover:bg-charcoal/95 relative last:border-b-0"
            >
              <span className="block mx-2">{lang.name}</span>
              {index !== languages.length - 1 && <span className="absolute left-2 right-2 bottom-0 border-b border-border"></span>}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-0 w-full bg-charcoal p-6 space-y-4">
            {menuItems.map((id) => (
              <button key={id} onClick={() => scrollToSection(id)} className={`block w-full text-left nav-link ${activeSection === id ? "nav-active" : ""}`}>
                {t(`nav.${id}`)}
              </button>
            ))}

            <div className="pt-4 border-t border-border">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-2 py-2 text-sm hover:bg-secondary"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .nav-link {
          font-family: Onest, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--foreground);
          padding: 8px 10px;
          border-radius: 6px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .nav-link:hover {
          background-color: "rgba(212, 175, 55, 0.12)";
        }

        .nav-active {
          color: #d4af37;
        }

        .nav-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: #d4af37;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.5s cubic-bezier(0.4,0,0.2,1),
                      width 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  );
};

export default Navbar;
