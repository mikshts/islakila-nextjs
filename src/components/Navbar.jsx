"use client";

import React, { useState, useEffect, useCallback } from "react";
// Adjust this import path depending on where your AuthContext is located in Next.js
import { useAuth } from "@/context/AuthContext";
import { signOutUser } from "@/services/auth";
import { MessageSquare, Coffee } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Updated to use your new shared Supabase client
import { ROUTES } from "@/constants"; // Update or remove if you use Next.js string paths directly

export default function Navbar({
  currentPage,
  navigate, // If you're using a custom layout manager, keep this. Otherwise, swap with Next.js useRouter()
  onToast,
  onOpenDonation,
}) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [conversationIds, setConversationIds] = useState([]);

  const getLastVisitKey = useCallback(
    () => `ik_messages_last_visit_${user?.id || "anon"}`,
    [user?.id],
  );

  const getLastVisit = useCallback(() => {
    if (typeof window === "undefined") return new Date(0); // SSR safe guard
    const ts = localStorage.getItem(getLastVisitKey());
    return ts ? new Date(ts) : new Date(0);
  }, [getLastVisitKey]);

  const updateLastVisit = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(getLastVisitKey(), new Date().toISOString());
    }
  }, [getLastVisitKey]);

  useEffect(() => {
    if (!user) {
      setConversationIds([]);
      return;
    }
    let isMounted = true;
    supabase
      .from("conversations")
      .select("id")
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
      .then(({ data, error }) => {
        if (isMounted && !error && data) {
          setConversationIds(data.map((c) => c.id));
        }
      });
    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    if (!user || conversationIds.length === 0) return;
    let isSubscribed = true;
    const lastVisit = getLastVisit();

    const fetchInitialUnread = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, created_at, sender_id, conversation_id")
        .in("conversation_id", conversationIds)
        .gt("created_at", lastVisit.toISOString())
        .neq("sender_id", user.id);
      if (!error && isSubscribed && data) {
        setUnreadCount(data.length);
      }
    };
    fetchInitialUnread();

    const channel = supabase
      .channel("navbar-messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMsg = payload.new;
          if (
            isSubscribed &&
            conversationIds.includes(newMsg.conversation_id) &&
            newMsg.sender_id !== user.id &&
            new Date(newMsg.created_at) > getLastVisit()
          ) {
            setUnreadCount((prev) => prev + 1);
          }
        },
      )
      .subscribe();

    return () => {
      isSubscribed = false;
      supabase.removeChannel(channel);
    };
  }, [user, conversationIds, getLastVisit]);

  useEffect(() => {
    if (currentPage === "messages" && user) {
      setUnreadCount(0);
      updateLastVisit();
    }
  }, [currentPage, user, updateLastVisit]);
  const handleAuthAction = async () => {
    setMenuOpen(false);
    if (user) {
      try {
        // Change this:
        await signOut();

        // To this:
        await signOutUser();

        onToast?.("Logged out successfully.", "info");
        navigate(ROUTES.HOME);
      } catch (err) {
        onToast?.(err.message, "error");
      }
    } else {
      navigate(ROUTES.LOGIN);
    }
  };
  const navTo = (page, opts = {}) => {
    setMenuOpen(false);
    navigate(page, opts);
  };

  const handleMessagesClick = () => {
    if (!user) {
      navTo(ROUTES.LOGIN);
    } else {
      navTo(ROUTES.MESSAGES);
    }
  };

  const handleDonationClick = () => {
    setMenuOpen(false);
    onOpenDonation?.();
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LEFT: Logo */}
          <div
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
            onClick={() => navTo(ROUTES.HOME)}>
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
            <span className="text-xl font-bold tracking-tight">
              <span className="text-gray-900">Isla</span>
              <span className="text-blue-600">kila</span>
            </span>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <div className="hidden sm:flex items-center justify-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => navTo(ROUTES.HOME)}
              className={`text-sm font-medium transition-colors ${
                currentPage === "home"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              Home
            </button>
            <button
              onClick={() => navTo(ROUTES.LISTINGS)}
              className={`text-sm font-medium transition-colors ${
                currentPage === "listings"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              Browse Listings
            </button>
            {user && (
              <button
                onClick={() => navTo(ROUTES.WISHLIST)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === "wishlist"
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                My Wishlist
              </button>
            )}
            {user && (
              <button
                onClick={() => navTo(ROUTES.MY_LISTINGS)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === "my_listings"
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}>
                My Listings
              </button>
            )}
            <button
              onClick={handleMessagesClick}
              className={`relative flex items-center gap-1 text-sm font-medium transition-colors ${
                currentPage === "messages"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}>
              <MessageSquare className="w-4 h-4" />
              Messages
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* RIGHT: Auth & Support (Desktop) */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={handleDonationClick}
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-xl hover:bg-blue-50 flex items-center gap-1.5">
              <Coffee className="w-4 h-4" />
              Support
            </button>
            <button
              onClick={handleAuthAction}
              className={`text-sm font-medium px-3 py-1.5 rounded-xl border transition-all ${
                user
                  ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}>
              {user ? "Logout" : "Login"}
            </button>
            <button
              onClick={() => (user ? navTo(ROUTES.POST) : navTo(ROUTES.LOGIN))}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0">
              ➕ Post a Listing
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
            aria-label="Toggle menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-2">
          <button
            onClick={() => navTo(ROUTES.HOME)}
            className={`text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              currentPage === "home"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}>
            Home
          </button>
          <button
            onClick={() => navTo(ROUTES.LISTINGS)}
            className={`text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
              currentPage === "listings"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}>
            Browse Listings
          </button>
          {user && (
            <button
              onClick={() => navTo(ROUTES.WISHLIST)}
              className={`text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                currentPage === "wishlist"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}>
              My Wishlist
            </button>
          )}
          {user && (
            <button
              onClick={() => navTo(ROUTES.MY_LISTINGS)}
              className={`text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
                currentPage === "my_listings"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}>
              My Listings
            </button>
          )}
          <button
            onClick={handleMessagesClick}
            className={`text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              currentPage === "messages"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}>
            <MessageSquare className="w-4 h-4" /> Messages
            {unreadCount > 0 && (
              <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={handleDonationClick}
            className="text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-all text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Coffee className="w-4 h-4" /> Support Us
          </button>
          <hr className="border-gray-100" />
          <button
            onClick={handleAuthAction}
            className={`py-2.5 px-3 rounded-xl text-sm font-semibold text-center border transition-colors ${
              user
                ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {user ? "Logout" : "Login"}
          </button>
          <button
            onClick={() => (user ? navTo(ROUTES.POST) : navTo(ROUTES.LOGIN))}
            className="py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 text-center transition-colors">
            ➕ Post a Listing
          </button>
        </div>
      )}
    </nav>
  );
}
