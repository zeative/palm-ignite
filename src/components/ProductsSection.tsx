import { useLanguage } from "@/contexts/LanguageContext";
import coconutImage from "@/assets/product-coconut.jpg";
import briquetteImage from "@/assets/product-briquette.jpg";
import hardwoodImage from "@/assets/product-hardwood.gif";
import { useEffect, useRef, useState } from "react";
import { Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";


const ProductsSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  const products = [
    {
      title: t("products.coconut"),
      description: t("products.coconut.desc"),
      image: coconutImage,
      specs: ["Export Grade", "BBQ & Shisha Use"],
    },
  ];

  const navigate = useNavigate();


  return (
    <section id="products" ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-secondary to-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gold/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="text-gold font-semibold mb-3 tracking-wide uppercase text-sm">Our Products</p>
            <h2 className="font-[Onest] text-4xl md:text-5xl font-bold text-foreground mb-4">{t("products.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("products.subtitle")}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="group relative h-full">
                <div
                  className={`relative h-full rounded-2xl overflow-hidden bg-card border border-border shadow-card transition-all duration-500 ${
                    hoveredIndex === index ? "shadow-card-hover border-gold/30 -translate-y-2" : ""
                  }`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={product.image} alt={product.title} className={`w-full h-full object-cover transition-transform duration-700 ${hoveredIndex === index ? "scale-110" : "scale-100"}`} />
                    <div className={`absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent transition-opacity duration-500 ${hoveredIndex === index ? "opacity-90" : "opacity-80"}`} />    
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-[Onest] text-2xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">{product.title}</h3>
                      <p className="text-muted-foreground text-[13px] leading-relaxed">{product.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {product.specs.map((spec, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <button onClick={() => navigate("/product/charcoal")} className={`inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all ${hoveredIndex === index ? "gap-3" : ""}`}>
                      View Specifications
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>

                  <div
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
                    style={{
                      background: "linear-gradient(135deg, transparent 0%, hsla(45, 90%, 55%, 0.1) 50%, transparent 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Need custom specifications or bulk orders?</p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gold to-gold text-charcoal font-semibold shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-105"
          >
            Request a Quote
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
