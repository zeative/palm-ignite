import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { X, ZoomIn } from "lucide-react";
import galleryEfficient from "@/assets/gallery-efficient.jpg";
import galleryTeams from "@/assets/gallery-teams.jpg";
import galleryProduct from "@/assets/gallery-product.jpg";
import gallerySafety from "@/assets/gallery-safety.jpg";

const GallerySection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

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

  const images = [
    { src: galleryEfficient, alt: "Efficient Production Proces", category: "Production" },
    { src: galleryTeams, alt: "Our Factory Teams", category: "Production" },
    { src: galleryProduct, alt: "Premium Barbecue Charcoal", category: "Export" },
    { src: gallerySafety, alt: "Safe Stuffing Container", category: "Security" },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imgContainerRef.current) return;
    const rect = imgContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
    setOffset({ x, y });
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-background to-secondary relative">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--gold) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--gold) / 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <p className="text-gold font-semibold mb-3 tracking-wide uppercase text-sm">Gallery</p>
            <h2 className="font-[Onest] text-4xl md:text-5xl font-bold text-foreground mb-4">{t("gallery.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("gallery.subtitle")}</p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div key={index} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: `${index * 150}ms` }}>
              <div
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]"
                onClick={() => {
                  setSelectedImage(image.src);
                  setIsZoomed(false);
                }}
              >
                {/* Image */}
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gold/20 text-gold border border-gold/30 backdrop-blur-sm mb-3">{image.category}</span>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{image.alt}</h3>
                    <div className="flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-4 h-4" />
                      <span className="text-sm font-medium">Click to enlarge</span>
                    </div>
                  </div>
                </div>

                {/* Border Glow on Hover */}
                <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/40 rounded-2xl transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">Experience our commitment to quality at every stage of production</p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-charcoal/98 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-foreground hover:text-gold bg-card/80 backdrop-blur-sm rounded-full transition-all hover:scale-110 shadow-lg z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image (Zoomable + Pan) */}
          <div
            ref={imgContainerRef}
            className="relative max-w-7xl max-h-[90vh] animate-scale-in overflow-hidden cursor-grab active:cursor-grabbing"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
              setOffset({ x: 0, y: 0 });
            }}
            onMouseMove={handleMouseMove}
          >
            <img
              src={selectedImage}
              alt="Gallery"
              className={`max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl transition-transform duration-300 ${isZoomed ? "scale-150 cursor-grab" : "scale-100 cursor-zoom-in"}`}
              style={{
                transform: isZoomed ? `scale(1.5) translate(${offset.x / 3}%, ${offset.y / 3}%)` : "scale(1) translate(0, 0)",
              }}
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-3 rounded-full backdrop-blur-xl bg-card/60 border border-glass-border">
            <p className="text-sm text-muted-foreground">Click anywhere to close</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
