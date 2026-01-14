import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "id";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.products": "Products",
    "nav.export": "Export",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.language": "Language",
    "hero.title": "The Gold Standard of Indonesian Charcoal for the Global Market",
    "hero.button": "Explore More",
    "about.title": "Palmignite Charcoal",
    "about.subtitle": "Premium Quality from Yogyakarta",
    "about.text":
      "We are an export trading company focused on selling reliable the best BBQ charcoal briquettes to our business partners worldwide. What sets us apart isn't just the products we ship, but also how we ship them. With clear communication, transparent documentation, and a proactive approach to every shipment, we ensure our partners experience consistency and peace of mind in every transaction.",
    "products.title": "Professional Charcoal Solutions",
    "products.subtitle": "Consistent Performance for BBQ & Shisha",
    "products.coconut": "Hexagonal Charcoal",
    "products.coconut.desc": "High-density charcoal with long burning time and low ash.",
    "products.briquette": "Product #2",
    "products.briquette.desc": "Deskripsi Produk",
    "products.hardwood": "Product #3",
    "products.hardwood.desc": "Deskripsi Produk",
    "export.title": "Global Export Reach",
    "export.subtitle": "Delivering Excellence Worldwide",
    "gallery.title": "Our Gallery",
    "gallery.subtitle": "See Our Quality in Action",
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's discuss your charcoal needs",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "footer.rights": "All Rights Reserved.",
  },
  id: {
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.products": "Produk",
    "nav.export": "Ekspor",
    "nav.gallery": "Galeri",
    "nav.contact": "Kontak",
    "nav.language": "Bahasa",

    "hero.title": "Standar Emas Arang Indonesia untuk Pasar Global",
    "hero.button": "Jelajahi Lebih Lanjut",

    "about.title": "Arang Palmignite",
    "about.subtitle": "Kualitas Premium dari Yogyakarta",
    "about.text":
      "Kami adalah perusahaan perdagangan ekspor yang berfokus pada penyediaan briket arang BBQ berkualitas tinggi dan andal untuk mitra bisnis kami di seluruh dunia. Keunggulan kami tidak hanya terletak pada produk yang kami kirimkan, tetapi juga pada cara kami menjalankan setiap pengiriman. Dengan komunikasi yang jelas, dokumentasi yang transparan, serta pendekatan yang proaktif, kami memastikan setiap mitra mendapatkan konsistensi dan ketenangan dalam setiap transaksi.",

    "products.title": "Solusi Arang Profesional",
    "products.subtitle": "Performa Konsisten untuk BBQ & Shisha",
    "products.coconut": "Arang Heksagonal",
    "products.coconut.desc": "Arang berdensitas tinggi dengan waktu bakar lama dan abu yang sangat rendah.",
    "products.briquette": "Produk #2",
    "products.briquette.desc": "Deskripsi produk",
    "products.hardwood": "Produk #3",
    "products.hardwood.desc": "Deskripsi produk",

    "export.title": "Jangkauan Ekspor Global",
    "export.subtitle": "Menghadirkan Kualitas Terbaik ke Seluruh Dunia",

    "gallery.title": "Galeri Kami",
    "gallery.subtitle": "Lihat Kualitas Produk Kami Secara Langsung",

    "contact.title": "Hubungi Kami",
    "contact.subtitle": "Mari diskusikan kebutuhan arang Anda",
    "contact.name": "Nama",
    "contact.email": "Email",
    "contact.message": "Pesan",
    "contact.send": "Kirim Pesan",

    "footer.rights": "Seluruh Hak Dilindungi.",
  },
  ko: {
    "nav.home": "홈",
    "nav.about": "회사 소개",
    "nav.products": "제품",
    "nav.export": "수출",
    "nav.gallery": "갤러리",
    "nav.contact": "문의",
    "nav.language": "언어",

    "hero.title": "글로벌 시장을 위한 인도네시아 숯의 골드 스탠다드",
    "hero.button": "더 알아보기",

    "about.title": "팜이그나이트 숯",
    "about.subtitle": "욕야카르타에서 제공하는 프리미엄 품질",
    "about.text":
      "저희는 전 세계 비즈니스 파트너를 위해 신뢰할 수 있는 최고 품질의 BBQ 숯 브리켓을 공급하는 수출 전문 무역 회사입니다. 저희의 차별점은 단순히 제품에만 있지 않고, 배송 방식에도 있습니다. 명확한 커뮤니케이션, 투명한 문서 관리, 그리고 모든 선적 과정에서의 적극적인 대응을 통해, 파트너사들이 매 거래마다 일관성과 신뢰를 경험할 수 있도록 보장합니다.",

    "products.title": "전문 숯 솔루션",
    "products.subtitle": "BBQ & 시샤를 위한 안정적인 성능",
    "products.coconut": "육각형 숯",
    "products.coconut.desc": "고밀도의 숯으로 연소 시간이 길고 재 발생이 적습니다.",
    "products.briquette": "제품 #2",
    "products.briquette.desc": "제품 설명",
    "products.hardwood": "제품 #3",
    "products.hardwood.desc": "제품 설명",

    "export.title": "글로벌 수출 네트워크",
    "export.subtitle": "전 세계에 최고의 품질을 제공합니다",

    "gallery.title": "갤러리",
    "gallery.subtitle": "제품 품질을 직접 확인해 보세요",

    "contact.title": "문의하기",
    "contact.subtitle": "숯 관련 문의를 환영합니다",
    "contact.name": "이름",
    "contact.email": "이메일",
    "contact.message": "메시지",
    "contact.send": "메시지 보내기",

    "footer.rights": "모든 권리 보유.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
