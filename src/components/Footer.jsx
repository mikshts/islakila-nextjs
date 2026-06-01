// src/components/Footer.jsx
import React from "react";
import { Heart, Palmtree } from "lucide-react";

const SocialIcon = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
    aria-label={label}>
    {children}
  </a>
);

export const Footer = ({ navigate, onOpenDonation, user }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 border-t border-gray-800 text-xs">
      {/* Compressed outer padding from py-6 to py-3 */}
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Main Row: Compressed padding from pb-6 to pb-3 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-3 border-b border-gray-800/60">
          {/* Left: Brand Stack with Wave Logo */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate?.("home")}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 8 C4 6, 6 6, 8 8 C10 10, 12 10, 14 8 C16 6, 18 6, 19 7"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M2 13 C4 11, 6 11, 8 13 C10 15, 12 15, 14 13 C16 11, 18 11, 19 12"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
              <span className="text-white font-bold text-base tracking-tight">
                Islakila
              </span>
              <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 ml-1">
                <Heart className="w-2.5 h-2.5 text-red-400 fill-red-400" />{" "}
                Local
              </span>
            </div>
            <p className="text-gray-400 text-[11px] text-center md:text-left max-w-xs">
              Bantayan Island's trusted marketplace for beach lots, homes &
              resorts.
            </p>
          </div>

          {/* Center: Slimmed-down Button */}
          <div className="flex items-center gap-3 bg-gray-800/40 pl-3 pr-2 py-1 rounded-full border border-gray-800">
            <span className="text-gray-400 text-[11px]">
              Keep Islakila free
            </span>
            <button
              onClick={onOpenDonation}
              className="bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium px-3 py-1 rounded-full transition-all shadow-sm">
              ☕ Support Project
            </button>
          </div>

          {/* Right: Low-profile Socials */}
          <div className="flex items-center gap-4">
            <SocialIcon
              href="https://www.facebook.com/profile.php?id=61590634821437"
              label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
              </svg>
            </SocialIcon>

            <SocialIcon href="https://x.com" label="X">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialIcon>

            <SocialIcon href="https://instagram.com" label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </SocialIcon>

            <SocialIcon
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSMVVzxXzPstPpGfDkVGxPWspltDwQZHBCBKzjFWxqlCBjfStvgxCZRDPqwDZCdRMBptPpsx"
              label="Email">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* Bottom Sub-row: Compressed padding from pt-4 to pt-3 */}
        <div className="pt-3 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 gap-2">
          <span>© {currentYear} Islakila. All rights reserved.</span>
          <span className="flex items-center gap-1 text-gray-400">
            <Palmtree className="w-3.5 h-3.5 text-blue-400/80" /> Bantayan
            Island, Cebu
          </span>
        </div>
      </div>
    </footer>
  );
};
