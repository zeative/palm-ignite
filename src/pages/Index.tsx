import AboutSection from "@/components/AboutSection";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";

import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import ExportSection from "@/components/ExportSection";
import GallerySection from "@/components/GallerySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-[Onest]">
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />

        <ExportSection />
        <GallerySection />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
