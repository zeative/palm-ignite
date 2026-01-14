import { useLanguage } from "@/contexts/LanguageContext";
import aboutImage from "@/assets/gallery-efficient.jpg";
import productionVideo from "@/assets/video-produksi.mp4";
import { useEffect, useRef, useState } from "react";
import { Award, Globe, Shield, TrendingUp } from "lucide-react";
import { SectionHeader } from "./ui/corporate/SectionHeader";
import { CorporateCard } from "./ui/corporate/CorporateCard";

const AboutSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [fadeVideo, setFadeVideo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
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

  const handleVideoEnd = () => {
    setFadeVideo(true);
    setTimeout(() => {
      setShowVideo(false);
    }, 600);
  };

  const features = [
    {
      icon: Award,
      title: "Transparency",
      description: "Clear reports and documentation for every shipment.",
    },
    {
      icon: Globe,
      title: "Consistency",
      description: "Monitored quality for reliable performance.",
    },
    {
      icon: Shield,
      title: "Sustainability",
      description: "100% natural coconut shells, eco-friendly.",
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description: "Expanding operations to meet global demand.",
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 bg-[#040303] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <SectionHeader label="About Us" title={t("about.title")} subtitle={t("about.subtitle")} />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
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
                <img src={aboutImage} alt="Palm Ignite Production" className="w-full h-auto object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-semibold text-lg">World-Class Facility</p>
                <p className="text-gray-300 text-sm">Yogyakarta, Indonesia</p>
              </div>
            </div>
          </div>

          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <p className="text-gray-300 text-lg leading-relaxed">{t("about.text")}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <CorporateCard key={index} className="p-5 flex items-start gap-4 hover:bg-white/5">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-400 leading-snug">{feature.description}</p>
                    </div>
                  </CorporateCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
