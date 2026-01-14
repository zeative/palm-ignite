import { useLanguage } from "@/contexts/LanguageContext";
import { Globe2, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";

const ExportSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const regions = [
    {
      region: "Asia",
      countries: [
        { name: "South Korea", code: "kr" },
        { name: "Japan", code: "jp" },
        { name: "China", code: "cn" },
        { name: "Vietnam", code: "vn" },
        { name: "Saudi Arabia", code: "sa" },
      ],
    },
    {
      region: "Europe",
      countries: [
        { name: "United Kingdom", code: "gb" },
        { name: "Nederland", code: "nl" },
      ],
    },
    {
      region: "America",
      countries: [{ name: "United States", code: "us" }],
    },
  ];

  return (
    <section id="export" ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-background to-secondary relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-2xl mb-6 border border-gold/20">
              <Globe2 className="w-8 h-8 text-gold" />
            </div>
            <p className="text-gold font-semibold mb-3 tracking-wide uppercase text-sm">Global Presence</p>
            <h2 className="font-[Onest] text-4xl md:text-5xl font-bold text-foreground mb-4">{t("export.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("export.subtitle")}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {regions.map((region, regionIndex) => (
            <div key={regionIndex} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`} style={{ transitionDelay: `${regionIndex * 150}ms` }}>
              <div className="glass-card p-6 md:p-8 rounded-2xl backdrop-blur-sm bg-card/40 border border-glass-border hover:border-gold/30 transition-all duration-300">
                <div className="flex items-center gzap-3 mb-6">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                  <h3 className="font-semibold text-lg text-foreground">{region.region}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {region.countries.map((country, countryIndex) => (
                    <div key={countryIndex} className="group relative">
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border hover:border-gold/40 hover:bg-secondary transition-all duration-300 cursor-pointer">
                        <img src={`https://flagicons.lipis.dev/flags/4x3/${country.code}.svg`} alt="" className="w-6" />
                        <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">{country.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 glass-card rounded-xl backdrop-blur-sm bg-card/40 border border-glass-border">
            <p className="text-4xl font-bold text-gold font-[Onest] mb-2">
              <CountUp end={8} duration={3} enableScrollSpy />+
            </p>
            <p className="text-sm text-muted-foreground">Countries Served</p>
          </div>
          <div className="text-center p-6 glass-card rounded-xl backdrop-blur-sm bg-card/40 border border-glass-border">
            <p className="text-4xl font-bold text-gold font-[Onest] mb-2">
              <CountUp end={5} duration={2} enableScrollSpy />
            </p>
            <p className="text-sm text-muted-foreground">Continents</p>
          </div>
          <div className="text-center p-6 glass-card rounded-xl backdrop-blur-sm bg-card/40 border border-glass-border">
            <p className="text-4xl font-bold text-gold font-[Onest] mb-2">
              <CountUp end={24} duration={3} enableScrollSpy />
              /
              <CountUp end={7} duration={3} enableScrollSpy />
            </p>
            <p className="text-sm text-muted-foreground">Support</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground text-lg">And expanding to more markets worldwide...</p>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
