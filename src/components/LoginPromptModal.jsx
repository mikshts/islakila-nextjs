// src/components/LoginPromptModal.jsx
import { X } from "lucide-react";
import { useEffect } from "react";

export const LoginPromptModal = ({ isOpen, onClose, onLoginClick }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Optional: add padding to avoid layout shift
      document.body.style.paddingRight = "0px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-3xl">🌴</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Islakila
          </h2>
          <p className="text-gray-500 mb-6">
            Sign in or create an account to save listings, post your own
            properties, and connect with the Bantayan community.
          </p>
          <div className="space-y-3">
            <button
              onClick={onLoginClick}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm">
              Log In / Sign Up
            </button>
            <button
              onClick={onClose}
              className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium py-2 transition-colors">
              Continue browsing without account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
