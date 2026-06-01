import { memo, useEffect } from "react";
import { X, Coffee, ExternalLink, QrCode } from "lucide-react";

// ===================== CONFIGURATION =====================
const PAYMONGO_PAGE_URL = "https://paymongo.page/l/support-islakila";
const PAYMONGO_QR_URL =
  "https://ggxbiqqcdddneuyknocz.supabase.co/storage/v1/object/public/Donations/qr-support-islakila(1).jpg";
const GCASH_NUMBER = "09605878922";
// =========================================================

export const DonationModal = memo(({ onClose, onToast }) => {
  // Prevents the background from scrolling while the modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleOpenPage = () => {
    window.open(PAYMONGO_PAGE_URL, "_blank");
    onToast?.("Opening payment page... 💚", "success");
    setTimeout(() => onClose(), 500);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(PAYMONGO_PAGE_URL);
      onToast?.("Link copied! 📋", "success");
    } catch {
      onToast?.("Copy failed. Please try again.", "error");
    }
  };

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(GCASH_NUMBER);
      onToast?.("GCash number copied! 📱", "success");
    } catch {
      onToast?.("Could not copy the phone number.", "error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      {/* Kept exact same layout container parameters */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {/* Header Section */}
        <div className="text-center mb-1">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-1">
            <Coffee className="w-7 h-7 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-1">
            <span className="text-gray-900">Support Isla</span>
            <span className="text-blue-600">kila</span>
          </h3>
          <p className="text-xs text-gray-500">
            Help us keep the platform free. But first, buy us a coffee! ☕
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-blue-50 rounded-xl p-3 mb-4 text-center">
          <p className="text-[11px] font-semibold text-gray-600 mb-1.5">
            Scan to donate
          </p>
          {/* Increased QR size boundary framework safely here to w-48 h-48 */}
          <div className="w-48 h-48 bg-white rounded-xl mx-auto border border-gray-200 overflow-hidden flex items-center justify-center shadow-sm">
            <img
              src={PAYMONGO_QR_URL}
              alt="QR"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/192x192?text=QR";
                onToast?.("QR not loaded. Use payment link.", "info");
              }}
            />
          </div>
          <p className="text-[10px] text-gray-500 mt-2">
            GCash · Maya · GrabPay · BPI · Card
          </p>

          {/* Manual GCash Sub-Element */}
          <div
            onClick={handleCopyNumber}
            className="mt-2.5 pt-2 border-t border-blue-100/50 cursor-pointer active:opacity-70 transition-opacity"
            title="Click to copy GCash number">
            <p className="text-[9px] font-bold text-blue-600 uppercase tracking-wide">
              Manual GCash Send
            </p>
            <p className="text-xs font-mono font-bold text-gray-700 hover:text-blue-600 transition-colors mt-0.5">
              {GCASH_NUMBER} 📋
            </p>
            <p className="text-[9px] text-gray-400">Name: J**D*. V.</p>
          </div>
        </div>

        {/* Blue Action Buttons (Optimized for size) */}
        <div className="flex flex-col gap-1.5">
          <button
            onClick={handleOpenPage}
            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-xs hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm flex items-center justify-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5" /> Donate via PayMongo
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full bg-blue-500 text-white py-1.5 rounded-xl text-xs font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5">
            <QrCode className="w-3.5 h-3.5" /> Copy Payment Link
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full text-gray-400 text-xs font-medium mt-3 hover:text-gray-500 text-center block">
          Maybe later
        </button>

        <p className="text-[9px] text-center text-gray-300 mt-3">
          Powered by PayMongo – Secure
        </p>
      </div>
    </div>
  );
});

DonationModal.displayName = "DonationModal";
