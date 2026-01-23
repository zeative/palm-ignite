import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeader } from "./ui/corporate/SectionHeader";
import { CorporateCard } from "./ui/corporate/CorporateCard";

const ContactSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk kontrol input dan validasi
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
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

  const formatPhoneNumber = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 15);
  };

  // Validasi: Email harus ada @ dan titik, field lain gak boleh kosong
  const isEmailValid = userEmail.includes("@") && userEmail.includes(".");
  const isFormValid = userName.trim() !== "" && isEmailValid && message.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || !isFormValid) return;

    setIsSubmitting(true);

    try {
      // EmailJS narik data berdasarkan atribut "name" di input, jadi isinya aman gak berubah
      await emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, formRef.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      toast.success(t("contact.success"));
      formRef.current.reset();

      // Reset semua state manual
      setPhoneNumber("");
      setUserName("");
      setUserEmail("");
      setMessage("");
    } catch (error) {
      toast.error(t("contact.error"));
      console.error("EmailJS Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4 relative">
        <SectionHeader label={t("contact.label")} title={t("contact.title")} subtitle={t("contact.subtitle")} />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 order-1 lg:order-2">
              <CorporateCard className="p-8 border-white/5 bg-card/40 backdrop-blur-md">
                <form ref={formRef} noValidate className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t("contact.form.name")}
                      </label>
                      <input
                        id="name"
                        name="user_name"
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none"
                        placeholder={t("contact.form.namePlaceholder")}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t("contact.form.email")}
                      </label>
                      <input
                        id="email"
                        name="user_email"
                        type="email"
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none"
                        placeholder={t("contact.form.emailPlaceholder")}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("contact.form.phone")}
                    </label>
                    <input
                      id="phone"
                      name="user_phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none"
                      placeholder={t("contact.form.phonePlaceholder")}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none resize-none"
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="w-full h-14 bg-gold hover:bg-gold-light text-charcoal font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed shadow-gold/20 hover:shadow-gold/40 shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t("contact.form.submit")}
                      </>
                    )}
                  </button>
                </form>
              </CorporateCard>
            </div>

            <div className="lg:col-span-2 order-2 lg:order-1 space-y-8">
              <div className="space-y-6">
                <div className="relative h-72 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <iframe
                    width="100%"
                    height="600"
                    scrolling="no"
                    src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=umbulharjo%20jogja+(Palmignite%20Charcoal%20Trade)&t=k&z=14&ie=UTF8&iwloc=B&output=embed"
                  ></iframe>
                  <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-charcoal transition-all duration-300 border border-gold/20">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{t("contact.info.visit")}</h3>
                    <p className="text-sm text-white leading-relaxed font-medium">{t("contact.info.address")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-charcoal transition-all duration-300 border border-gold/20">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{t("contact.info.email")}</h3>
                    <a href="mailto:palmignitecharcoaltrade@gmail.com" className="text-sm text-white hover:text-gold transition-colors font-medium">
                      info@palmignitetrade.comm
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-charcoal transition-all duration-300 border border-gold/20">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">{t("contact.info.call")}</h3>
                    <a href="https://wa.me/6282221521043" target="_blank" rel="noopener noreferrer" className="text-sm text-white hover:text-gold transition-colors font-medium">
                      +62 822-2152-1043
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
