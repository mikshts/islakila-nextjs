import "./globals.css";
import Navbar from "@/components/Navbar";
// Note: If your AuthProvider is set up, make sure it wraps everything here too!

export const metadata = {
  title: "Islakila",
  description: "Your Island Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        {/* The Navbar stays pinned on top of all routes */}
        <Navbar
          currentPage="home" // You can dynamically handle state later if needed
          navigate={(path) => (window.location.href = path)} // Temporary simple fallback router link
        />

        {/* This renders your specific page content (like page.js) */}
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
