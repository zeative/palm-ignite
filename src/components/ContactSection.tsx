import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

interface ContactSectionProps {
  onMobileMapChange?: (mapElement: React.ReactNode | null) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({ onMobileMapChange }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [popup, setPopup] = useState<{ visible: boolean; message: string; type: "success" | "error" }>({
    visible: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setIsVisible(true), { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // ✅ Khusus untuk phone
    if (name === "phone") {
      let numberOnly = value.replace(/\D/g, "");
      numberOnly = numberOnly.slice(0, 15);
      const formatted = "+" + numberOnly;
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    // ✅ Update input lain (name, email, message, dll)
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneFocus = () => {
    // Kalau belum ada nilai, isi otomatis dengan "+"
    if (!formData.phone) {
      setFormData((prev) => ({ ...prev, phone: "+" }));
    }
  };

  const handlePhoneBlur = () => {
    // Kalau cuma ada "+", reset jadi kosong lagi
    if (formData.phone === "+") {
      setFormData((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your full name.";
    if (!formData.email.trim()) return "Please enter your email address.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email address.";

    if (!formData.phone.trim()) return "Please enter your phone number.";

    // ✅ Ambil hanya angka (abaikan simbol +)
    const numberOnly = formData.phone.replace(/\D/g, "");

    // ✅ Minimal 8 digit
    if (numberOnly.length < 8) return "Please enter a valid phone number (minimum 8 digits).";

    // ✅ Maksimal 15 digit berdasarkan standar internasional E.164
    if (numberOnly.length > 15) return "Please enter a valid phone number (maximum 15 digits).";

    if (!formData.message.trim()) return "Please enter your message.";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const errorMsg = validateForm();
    if (errorMsg) {
      setPopup({ visible: true, message: errorMsg, type: "error" });
      return;
    }

    emailjs.sendForm("service_f935qwz", "template_3gp8qxc", formRef.current, "pxJzSyZ19cVMH5e11").then(
      () => {
        setPopup({ visible: true, message: "Message sent successfully!", type: "success" });
        setFormData({ name: "", email: "", phone: "", message: "", agree: false });
      },
      (error) => {
        console.error("FAILED...", error.text);
        setPopup({ visible: true, message: "Failed to send message. API nya error brok wkwkkw", type: "error" });
      }
    );
  };

  const mapIframe = (
    <div className={`rounded-xl mb-6 p-1 bg-gold/20 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 blur-0" : "opacity-0 blur-lg"}`}>
      <div className="rounded-xl overflow-hidden">
        <iframe
          title="My Embedded Google Map"
          src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Yogyakarta&t=&z=15&ie=UTF8&iwloc=B&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPopup((prev) => ({ ...prev, visible: false }));
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      // Kalau user lagi fokus di textarea
      if (document.activeElement?.tagName === "TEXTAREA") {
        // Shift+Enter = normal newline
        if (e.shiftKey) return;

        // Enter = submit form
        if (e.key === "Enter") {
          e.preventDefault();
          if (formRef.current) formRef.current.requestSubmit();
        }
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, []);

  useEffect(() => {
    if (onMobileMapChange) {
      onMobileMapChange(isMobile ? mapIframe : null);
    }
  }, [isMobile]);

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-b from-secondary to-background relative">
      {popup.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-80 shadow-xl relative animate-fadeIn">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white" onClick={() => setPopup({ ...popup, visible: false })}>
              <X className="w-5 h-5" />
            </button>
            <h3 className={`text-lg font-semibold mb-2 ${popup.type === "success" ? "text-green-600" : "text-red-600"}`}>{popup.type === "success" ? "Success!" : "Information!"}</h3>
            <p className="text-gray-700 dark:text-gray-300">{popup.message}</p>
          </div>
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-gold/5 blur-3xl rounded-full" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <p className="text-gold font-semibold mb-3 tracking-wide uppercase text-sm">Get In Touch</p>
              <h2 className="font-[Onest] text-4xl md:text-5xl font-bold text-foreground mb-4">{t("contact.title")}</h2>
              <p className="text-muted-foreground text-lg">{t("contact.subtitle")}</p>
            </div>
          </div>

          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 order-1 lg:order-2">
                <form ref={formRef} noValidate className="glass-card p-8 rounded-2xl backdrop-blur-sm bg-card/40 border border-glass-border space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-gold h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-gold h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Your country code  phone number"
                      value={formData.phone}
                      onFocus={handlePhoneFocus}
                      onBlur={handlePhoneBlur}
                      onChange={handleChange}
                      className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-gold h-12 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2 relative">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>

                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:border-gold resize-none rounded-xl h-32"
                      rows={6}
                    />

                    {formData.message.length > 0 && <span className="absolute bottom-3 right-4 text-xs text-muted-foreground">{formData.message.length}</span>}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" id="agree" checked={formData.agree || false} onChange={(e) => setFormData({ ...formData, agree: e.target.checked })} className="w-5 h-5 accent-gold cursor-pointer" />
                    <label htmlFor="agree" className="text-sm text-muted-foreground cursor-pointer">
                      I agree to send this message
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={!formData.agree}
                    className={`w-full group font-semibold px-8 py-6 rounded-xl ${
                      formData.agree ? "bg-gradient-to-r from-gold to-gold-light text-charcoal shadow-gold hover:shadow-gold-lg" : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {t("contact.send")}
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </form>
              </div>

              <div className="lg:col-span-2 order-2 lg:order-1 -space-y-0.5">
                {!isMobile && mapIframe}
                {!isMobile && (
                  <div className={`glass-card p-6 rounded-2xl backdrop-blur-sm bg-gold/5 border border-gold/20 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 blur-0" : "opacity-0 blur-lg"}`}>
                    <p className="text-sm text-muted-foreground mb-2">Business Hours</p>
                    <p className="text-foreground font-medium">Monday - Saturday</p>
                    <p className="text-foreground font-medium">10:00 - 20:00 WIB</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
