import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Charcoal from "./pages/Charcoal";

const queryClient = new QueryClient();

const App = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupAnimatingOut, setPopupAnimatingOut] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // blok klik kanan
      setPopupAnimatingOut(false); // pastikan animasi masuk
      setShowPopup(true);

      // mulai animasi keluar sebelum dihapus
      setTimeout(() => {
        setPopupAnimatingOut(true); // trigger slide-down
        setTimeout(() => setShowPopup(false), 500); // hapus setelah animasi 0.5s
      }, 2000); // tampil selama 4 detik sebelum slide-down
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div
            className="select-none"
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              WebkitTouchCallout: "none",
            }}
          >
            <Helmet>
              <title>Palmignite Charcoal | Premium Indonesian Charcoal Export Supplier</title>
            </Helmet>

            <Toaster />
            <Sonner />

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/product" element={<Product />}>
                  <Route path="charcoal" element={<Charcoal />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>

            {/* Popup di bawah dengan slide-up & swipe-down */}
            {showPopup && (
              <div
                className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black/75 border border-gold text-gold px-9 py-3 rounded-md shadow-lg z-50 font-mono ${
                  popupAnimatingOut ? "animate-slide-down" : "animate-slide-up"
                }`}
                style={{
                  boxShadow: "0 0 5px #FFD700",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                <span className="font-extrabold">SYSTEM ALERT</span> - Right-click is disabled.
              </div>
            )}

            {/* Tailwind animation untuk slide-up dan slide-down */}
            <style>
              {`
                @keyframes slide-up {
                  0% { opacity: 0; transform: translate(-50%, 20px); }
                  100% { opacity: 1; transform: translate(-50%, 0); }
                }
                .animate-slide-up {
                  animation: slide-up 0.5s ease-out forwards;
                }

                @keyframes slide-down {
                  0% { opacity: 1; transform: translate(-50%, 0); }
                  100% { opacity: 0; transform: translate(-50%, 20px); }
                }
                .animate-slide-down {
                  animation: slide-down 0.5s ease-in forwards;
                }
              `}
            </style>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
