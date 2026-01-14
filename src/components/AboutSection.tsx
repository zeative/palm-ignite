import { useLanguage } from "@/contexts/LanguageContext";
import aboutImage from "@/assets/gallery-efficient.jpg";
import productionVideo from "@/assets/video-produksi.mp4";
import { useEffect, useRef, useState } from "react";
import { Award, Globe, Shield, TrendingUp } from "lucide-react";

const AboutSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // 🔥 video state (BARU)
  const [showVideo, setShowVideo] = useState(true);
  const [fadeVideo, setFadeVideo] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  const fullText = t("about.text");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setTypedText("");
          setIsTyping(false);
          setShowVideo(true);
          setFadeVideo(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // 🔥 Typing animation (ONLY for about.text)
  useEffect(() => {
    if (!isVisible) return;

    let index = -1;
    setTypedText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;

      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 14);

    return () => clearInterval(interval);
  }, [isVisible, fullText]);

  // 🔥 video selesai → fade → ganti image
  const handleVideoEnd = () => {
    setFadeVideo(true);
    setTimeout(() => {
      setShowVideo(false);
    }, 600);
  };

  const features = [
    {
      icon: Award,
      title: "Transparency at Every Step",
      description: "We provide clear photos, videos, and lab reports so you know exactly what you’re receiving",
    },
    {
      icon: Globe,
      title: "Consistecy You Can Trust",
      description: "Every shipment is carefully monitored for consistent quality and reliable performance.",
    },
    {
      icon: Shield,
      title: "Sustainable by Nature",
      description: "Our briquettes use selected coconut shells, a natural Indonesian byproduct, so no trees are cut down.",
    },
    {
      icon: TrendingUp,
      title: "Consistent Growth",
      description: "Expanding operations with growing demand",
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-background to-secondary relative">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="text-gold font-semibold mb-3 tracking-wide uppercase text-sm">About Us</p>
            <h2 className="font-[Onest] text-4xl md:text-5xl font-bold text-foreground mb-4">{t("about.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("about.subtitle")}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                {showVideo ? (
                  <video
                    src={productionVideo}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnd}
                    className={`w-full h-auto object-cover transition-opacity duration-500 ${fadeVideo ? "opacity-0" : "opacity-100"}`}
                  />
                ) : (
                  <img src={aboutImage} alt="Palm Ignite Production" className="w-full h-auto object-cover transition-opacity duration-700 opacity-100" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-xl backdrop-blur-xl bg-card/60 border border-glass-border">
                  <p className="text-gold font-semibold text-sm">Yogyakarta, Indonesia</p>
                  <p className="text-foreground/80 text-xs mt-1">World-Class Production Facility</p>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/20 rounded-full blur-3xl -z-10 group-hover:bg-gold/30 transition-colors" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gold/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="space-y-6">
              <p className="text-foreground/90 text-lg leading-relaxed min-h-[120px]">
                {typedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="glass-card p-5 rounded-xl backdrop-blur-sm bg-card/40 border border-glass-border hover:border-gold/30 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 text-gold font-semibold hover:gap-3 transition-all"
                >
                  Learn More About Us
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
