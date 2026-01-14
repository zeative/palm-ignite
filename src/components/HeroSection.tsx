import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";
import CountUp from "react-countup";
import backgroundVideo from "@/assets/background.mp4";
import fireSound from "@/assets/backsound-fire.mp3";
import { useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioReady, setAudioReady] = useState(false);

  // Smooth parallax using requestAnimationFrame
  useEffect(() => {
    let requestId: number;
    const updateParallax = () => {
      if (videoRef.current) {
        const offsetY = window.scrollY * 0.5;
        videoRef.current.style.transform = `translate3d(0, ${offsetY}px, 0)`;
      }
      requestId = requestAnimationFrame(updateParallax);
    };
    requestId = requestAnimationFrame(updateParallax);
    return () => cancelAnimationFrame(requestId);
  }, []);

  // Audio fade in/out
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0;
    audio.muted = true; // mute dulu supaya autoplay aman
    audio.play().catch(() => {}); // autoplay fallback

    const hero = document.getElementById("home");
    if (!hero) return;

    const fadeVolume = (target: number, duration: number) => {
      const start = audio.volume;
      const diff = target - start;
      const startTime = performance.now();

      const step = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        audio.volume = start + diff * progress;
        if (progress < 1) requestAnimationFrame(step);
        else if (target === 0) audio.pause();
      };

      if (audio.paused && target > 0) audio.play().catch(() => {});
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!audioReady) return; // tunggu user interaksi
            fadeVolume(0.3, 1000);
          } else {
            fadeVolume(0, 1000);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);

    // trigger fade in setelah user scroll / klik supaya autoplay diterima browser
    const handleUserInteract = () => {
      if (!audioReady) {
        audio.muted = false; // unmute
        setAudioReady(true);
        // cek dulu hero visible saat interaksi
        const rect = hero.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          fadeVolume(0.3, 1000);
        }
      }
      window.removeEventListener("scroll", handleUserInteract);
      window.removeEventListener("click", handleUserInteract);
    };

    window.addEventListener("scroll", handleUserInteract, { passive: true });
    window.addEventListener("click", handleUserInteract);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleUserInteract);
      window.removeEventListener("click", handleUserInteract);
    };
  }, [audioReady]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        flex
        items-center
        w-full
        max-w-full
        overflow-hidden
        py-24
        lg:py-0
      "
    >
      {/* ================= BACKGROUND VIDEO PARALLAX ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
          <source src={backgroundVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/[94%]" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-gold-radial)" }} />
      </div>

      {/* Audio */}
      <audio ref={audioRef} src={fireSound} />

      {/* Decorative (DESKTOP ONLY) */}
      <div className="hidden lg:block absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse z-10" />
      <div className="hidden lg:block absolute bottom-20 left-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-pulse z-10" style={{ animationDelay: "1s" }} />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            {/* Left */}
            <div className="text-center lg:text-left space-y-8 animate-fade-in-left">
              <div className="mt-4">
                <h1 className="font-[poppins] text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold !leading-[1.08]">
                  <span className="text-foreground">{t("hero.title").split(" ").slice(0, 3).join(" ")}</span>
                  <br />
                  <span className="text-gold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text animate-shimmer">{t("hero.title").split(" ").slice(3).join(" ")}</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Your trusted partner for the perfect sear. <br />
                Delivering world-class BBQ charcoal from Yogyakarta to pitmasters worldwide.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={scrollToAbout} size="lg" className="bg-gradient-to-r from-gold to-gold-light text-charcoal font-semibold px-8 py-6 rounded-xl hover:scale-105 transition">
                  {t("hero.button")}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="border-2 border-gold/30 text-gold hover:bg-gold/10"
                >
                  Request Call
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1">
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold text-gold">
                    <CountUp end={3} duration={3} />+
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Supplier Partners Indonesia</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold text-gold">
                    <CountUp end={10} duration={5} />+
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Years Supplier Experiences</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold text-gold">
                    <CountUp end={95} duration={5} />%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Quality</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="hidden lg:block animate-fade-in-right">
              <div className="relative">
                {/* Main Card */}
                <div className="glass-card p-8 rounded-2xl backdrop-blur-xl bg-card/40 border border-glass-border shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Premium Quality</h3>
                        <p className="text-sm text-muted-foreground">Certified international standards</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Global Export</h3>
                        <p className="text-sm text-muted-foreground">Shipping 15+ countries</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Trusted Supplier</h3>
                        <p className="text-sm text-muted-foreground">Reliable & consistent delivery</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Accent Card */}
                <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-xl backdrop-blur-xl bg-gold/10 border border-gold/20 shadow-gold">
                  <p className="text-sm text-gold font-semibold">#1 Charchoal Trader </p>
                  <p className="text-xs text-muted-foreground mt-1">Leading Barbeque in Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button onClick={scrollToAbout} className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gold/60 hover:text-gold animate-bounce z-10">
        <span className="text-xs font-medium">Scroll Down</span>
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
};

export default HeroSection;
