"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  MessageSquare,
  Inbox,
  Phone,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const MESSAGES_PER_PAGE = 20;

// Helper to format phone for display locally
const formatPhoneForDisplay = (num) => {
  if (!num) return "";
  const cleaned = num.toString().replace(/\D/g, "");
  if (cleaned.startsWith("63"))
    return `+63 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  if (cleaned.startsWith("0"))
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  return num;
};

// ---------- ChatScreen with listing image and clickable header ----------
const ChatScreen = memo(
  ({
    conversationId,
    user,
    onBack,
    listingContactNumber,
    listingTitle,
    listingImage,
    listingId,
  }) => {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [sending, setSending] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingOlder, setLoadingOlder] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const bottomRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const channelRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const inputRef = useRef(null);
    const prevMessageCountRef = useRef(0);

    // Mark messages as read
    useEffect(() => {
      if (!conversationId || !user) return;
      const markAsRead = async () => {
        await supabase
          .from("messages")
          .update({ is_read: true })
          .eq("conversation_id", conversationId)
          .neq("sender_id", user.id)
          .eq("is_read", false);
      };
      markAsRead();
    }, [conversationId, user]);

    // Load initial messages
    const loadInitialMessages = useCallback(async () => {
      if (!conversationId) return;
      setInitialLoading(true);
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: false })
          .limit(MESSAGES_PER_PAGE);
        if (error) throw error;
        const sorted = (data || []).reverse();
        setMessages(sorted);
        setHasMore(sorted.length === MESSAGES_PER_PAGE);
        prevMessageCountRef.current = sorted.length;
        window.requestAnimationFrame(() => {
          if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "auto" });
          }
        });
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        setInitialLoading(false);
      }
    }, [conversationId]);

    // Load older messages with scroll preservation
    const loadOlderMessages = useCallback(async () => {
      if (loadingOlder || !hasMore || messages.length === 0) return;
      const container = scrollContainerRef.current;
      if (!container) return;
      const oldScrollTop = container.scrollTop;
      const oldScrollHeight = container.scrollHeight;
      prevMessageCountRef.current = messages.length;
      setLoadingOlder(true);
      try {
        const oldestDate = messages[0]?.created_at;
        if (!oldestDate) return;
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .lt("created_at", oldestDate)
          .order("created_at", { ascending: false })
          .limit(MESSAGES_PER_PAGE);
        if (error) throw error;
        if (data && data.length > 0) {
          const olderMessages = data.reverse();
          setMessages((prev) => [...olderMessages, ...prev]);
          setHasMore(data.length === MESSAGES_PER_PAGE);
          window.requestAnimationFrame(() => {
            if (container) {
              const newScrollHeight = container.scrollHeight;
              const heightDiff = newScrollHeight - oldScrollHeight;
              container.scrollTop = oldScrollTop + heightDiff;
            }
          });
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Failed to load older messages:", err);
      } finally {
        setLoadingOlder(false);
      }
    }, [conversationId, messages, loadingOlder, hasMore]);

    // Subscribe to new messages (realtime)
    useEffect(() => {
      if (!conversationId) return;
      loadInitialMessages();
      const channel = supabase
        .channel(`messages:${conversationId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${conversationId}`,
          },
          (payload) => {
            setMessages((prev) => {
              if (prev.find((m) => m.id === payload.new.id)) return prev;
              return [...prev, payload.new];
            });
            if (payload.new.sender_id !== user?.id) {
              supabase
                .from("messages")
                .update({ is_read: true })
                .eq("id", payload.new.id);
            }
          },
        )
        .subscribe();
      channelRef.current = channel;
      return () => {
        supabase.removeChannel(channel);
      };
    }, [conversationId, user, loadInitialMessages]);

    // Scroll-to-Bottom Effect
    useEffect(() => {
      if (loadingOlder || initialLoading) return;
      if (messages.length > prevMessageCountRef.current + 1) {
        prevMessageCountRef.current = messages.length;
        return;
      }
      if (bottomRef.current) {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
      prevMessageCountRef.current = messages.length;
    }, [messages, loadingOlder, initialLoading, user]);

    // Typing indicator (realtime broadcast)
    useEffect(() => {
      if (!conversationId || !user) return;
      const typingChannel = supabase.channel(`typing:${conversationId}`, {
        config: { broadcast: { ack: false } },
      });
      typingChannel
        .on("broadcast", { event: "typing" }, ({ payload }) => {
          if (payload.userId !== user.id) {
            setOtherUserTyping(true);
            clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(
              () => setOtherUserTyping(false),
              1500,
            );
          }
        })
        .subscribe();
      return () => {
        supabase.removeChannel(typingChannel);
        clearTimeout(typingTimeoutRef.current);
      };
    }, [conversationId, user]);

    const handleTyping = useCallback(() => {
      if (!conversationId || !user) return;
      supabase.channel(`typing:${conversationId}`).send({
        type: "broadcast",
        event: "typing",
        payload: { userId: user.id, timestamp: Date.now() },
      });
    }, [conversationId, user]);

    const handleSend = useCallback(async () => {
      const text = inputText.trim();
      if (!text || sending || !user) return;
      setSending(true);
      setInputText("");
      const { error } = await supabase.from("messages").insert({
        conversation_id: conversationId,
        sender_id: user.id,
        text,
        is_read: false,
      });
      if (error) setInputText(text);
      setSending(false);
    }, [inputText, sending, user, conversationId]);

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        } else if (e.key !== "Shift") {
          handleTyping();
        }
      },
      [handleSend, handleTyping],
    );

    const handleInputFocus = useCallback(() => {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }, []);

    const formatTime = (ts) =>
      new Date(ts).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    const goToListing = () => {
      if (listingId) {
        router.push(`/listings/${listingId}`);
      }
    };

    return (
      <div className="flex flex-col h-full">
        {/* Header with image and clickable area */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 cursor-pointer md:hidden">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToListing}
            className="flex-1 flex items-center gap-2 text-left min-w-0 cursor-pointer">
            {listingImage && (
              <img
                src={listingImage}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {listingTitle || "Conversation"}
              </p>
              {listingContactNumber && (
                <p className="text-[11px] text-gray-500 font-mono truncate">
                  📞 {formatPhoneForDisplay(listingContactNumber)}
                </p>
              )}
            </div>
          </button>
          {listingContactNumber && (
            <a
              href={`tel:${listingContactNumber}`}
              className="flex-shrink-0 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1.5 rounded-full transition-colors">
              <Phone className="w-3 h-3" />
              Call
            </a>
          )}
        </div>

        {/* Messages viewport */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-2 bg-gray-50/50">
          {initialLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : (
            <>
              {hasMore && messages.length > 0 && (
                <div className="flex justify-center my-2">
                  <button
                    onClick={loadOlderMessages}
                    disabled={loadingOlder}
                    className="text-xs text-blue-600 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer">
                    {loadingOlder && (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    )}
                    {loadingOlder ? "Loading..." : "Load older messages"}
                  </button>
                </div>
              )}

              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-400">
                  <MessageSquare className="w-10 h-10 text-gray-200" />
                  <p className="text-sm font-medium">No messages yet</p>
                  <p className="text-xs">Be the first to say something!</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isOwn = msg.sender_id === user?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"} w-full min-w-0`}>
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-xs break-words [word-break:break-word] ${
                          isOwn
                            ? "bg-blue-600 text-white rounded-br-sm"
                            : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm"
                        }`}>
                        <p className="whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <p
                            className={`text-[10px] ${
                              isOwn ? "text-blue-200" : "text-gray-400"
                            }`}>
                            {formatTime(msg.created_at)}
                          </p>
                          {isOwn && msg.is_read && (
                            <span className="text-[9px] text-blue-300 font-bold">
                              ✓✓
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Typing indicator */}
              {otherUserTyping && (
                <div className="flex justify-start mb-1">
                  <div className="bg-gray-200 text-gray-600 px-3 py-2 rounded-2xl rounded-bl-sm">
                    <div className="flex items-center gap-1">
                      <span
                        className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </>
          )}
        </div>

        {/* Input bar */}
        <div className="px-4 py-3 bg-white border-t border-gray-100">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              placeholder="Type a message…"
              rows={1}
              className="flex-1 resize-none bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all max-h-28"
              style={{ minHeight: "42px" }}
            />
            <button
              onClick={handleSend}
              disabled={sending || !inputText.trim()}
              className="flex-shrink-0 w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl flex items-center justify-center transition-all active:scale-95 cursor-pointer">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 text-right font-medium">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    );
  },
);
ChatScreen.displayName = "ChatScreen";

// ---------- InboxList with Messenger‑style unread highlight ----------
const InboxList = memo(
  ({ conversations, loading, onSelect, activeId, userId }) => {
    const activeRef = useRef(null);
    const [hasUnread, setHasUnread] = useState({});

    useEffect(() => {
      if (!userId || conversations.length === 0) return;
      const fetchUnreadStatus = async () => {
        const status = {};
        for (const conv of conversations) {
          const { count, error } = await supabase
            .from("messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conv.id)
            .eq("is_read", false)
            .neq("sender_id", userId);
          if (!error) status[conv.id] = (count || 0) > 0;
        }
        setHasUnread(status);
      };
      fetchUnreadStatus();

      const channel = supabase
        .channel("unread-updates")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          (payload) => {
            const msg = payload.new;
            if (msg.sender_id !== userId && msg.is_read === false) {
              setHasUnread((prev) => ({
                ...prev,
                [msg.conversation_id]: true,
              }));
            }
          },
        )
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "messages" },
          (payload) => {
            const msg = payload.new;
            if (msg.sender_id !== userId && msg.is_read === true) {
              supabase
                .from("messages")
                .select("*", { count: "exact", head: true })
                .eq("conversation_id", msg.conversation_id)
                .eq("is_read", false)
                .neq("sender_id", userId)
                .then(({ count }) => {
                  setHasUnread((prev) => ({
                    ...prev,
                    [msg.conversation_id]: (count || 0) > 0,
                  }));
                });
            }
          },
        )
        .subscribe();
      return () => {
        supabase.removeChannel(channel);
      };
    }, [conversations, userId]);

    useEffect(() => {
      if (activeId && activeRef.current) {
        activeRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, [activeId]);

    if (loading) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      );
    }

    if (conversations.length === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <Inbox className="w-12 h-12 text-gray-200" />
          <p className="text-sm font-semibold text-gray-600">
            No conversations yet
          </p>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Browse listings and click "Message Seller" to start a conversation.
          </p>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
        {conversations.map((conv) => {
          const unread = hasUnread[conv.id] || false;
          return (
            <button
              key={conv.id}
              ref={activeId === conv.id ? activeRef : null}
              onClick={() => onSelect(conv)}
              className={`w-full text-left px-4 py-3.5 hover:bg-gray-50 transition-colors flex items-center gap-3 cursor-pointer ${
                activeId === conv.id
                  ? "bg-blue-50 border-l-2 border-blue-500"
                  : ""
              } ${unread ? "bg-blue-50" : ""}`}>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 relative">
                {conv.listing?.image ? (
                  <img
                    src={conv.listing.image}
                    alt=""
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm truncate ${
                    unread
                      ? "font-bold text-gray-900"
                      : "font-medium text-gray-600"
                  }`}>
                  {conv.listing?.title || "Listing"}
                </p>
                <p className="text-xs text-gray-400 truncate font-mono">
                  conv_{conv.id.slice(0, 6)}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="text-[10px] text-gray-400 font-medium">
                  {new Date(conv.created_at).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                {unread && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
            </button>
          );
        })}
      </div>
    );
  },
);
InboxList.displayName = "InboxList";

// ---------- MessagesPage (main) ----------
export default function MessagesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Natively check if a conversation parameter hook exists in the URL path parameters
  const initialConversationId = searchParams.get("id");

  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [activeConversationId, setActiveConversationId] = useState(
    initialConversationId || null,
  );
  const [mobileShowChat, setMobileShowChat] = useState(!!initialConversationId);
  const [activeListingContact, setActiveListingContact] = useState(null);
  const [activeListingTitle, setActiveListingTitle] = useState(null);
  const [activeListingImage, setActiveListingImage] = useState(null);
  const [activeListingId, setActiveListingId] = useState(null);

  // Auth Session Observer
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Sync state if conversation id changes via direct query param strings
  useEffect(() => {
    if (initialConversationId) {
      setActiveConversationId(initialConversationId);
      setMobileShowChat(true);
    }
  }, [initialConversationId]);

  // Fetch user active inbox data
  useEffect(() => {
    if (!user) return;
    supabase
      .from("conversations")
      .select("*, listing:listings(id, title, contact_number, images)")
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) {
          const enriched = data.map((conv) => ({
            ...conv,
            listing: {
              ...conv.listing,
              image: conv.listing?.images?.[0] || null,
              id: conv.listing?.id || null,
            },
          }));
          setConversations(enriched);
        }
        setLoadingConvs(false);
      });
  }, [user]);

  // Handle syncing side drawer visibility indicators
  useEffect(() => {
    if (!activeConversationId) {
      setActiveListingContact(null);
      setActiveListingTitle(null);
      setActiveListingImage(null);
      setActiveListingId(null);
      return;
    }
    const conv = conversations.find((c) => c.id === activeConversationId);
    if (conv && conv.listing) {
      setActiveListingContact(conv.listing.contact_number);
      setActiveListingTitle(conv.listing.title);
      setActiveListingImage(conv.listing.image);
      setActiveListingId(conv.listing.id);
    } else {
      supabase
        .from("conversations")
        .select("listing:listings(id, title, contact_number, images)")
        .eq("id", activeConversationId)
        .single()
        .then(({ data, error }) => {
          if (!error && data?.listing) {
            setActiveListingContact(data.listing.contact_number);
            setActiveListingTitle(data.listing.title);
            setActiveListingImage(data.listing.images?.[0] || null);
            setActiveListingId(data.listing.id);
          }
        });
    }
  }, [activeConversationId, conversations]);

  const handleSelectConversation = useCallback(
    (conv) => {
      setActiveConversationId(conv.id);
      setMobileShowChat(true);
      // Optimistic clean URL search parameter tracking updates
      router.push(`/messages?id=${conv.id}`, { scroll: false });
    },
    [router],
  );

  const handleBack = useCallback(() => {
    setMobileShowChat(false);
    router.push("/messages", { scroll: false });
  }, [router]);

  if (!user && !loadingConvs) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center font-sans">
        <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-gray-800">Chat Rooms Locked</h2>
        <p className="text-gray-400 text-sm mt-1 mb-5">
          Please log in to sync active inbox threads and message users.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200/50 cursor-pointer">
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-100px)] px-4 py-6 font-sans">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex-1 flex min-h-0 shadow-gray-100/30">
        {/* Sidebar Inbox List View pane */}
        <div
          className={`flex flex-col border-r border-gray-100 ${
            mobileShowChat ? "hidden md:flex" : "flex"
          } w-full md:w-80 flex-shrink-0`}>
          <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-2 select-none">
            <button
              onClick={() => router.push("/")}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 md:hidden cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <Inbox className="w-4 h-4 text-gray-400" />
            <h1 className="text-sm font-bold text-gray-800">Inbox Channels</h1>
            {conversations.length > 0 && (
              <span className="ml-auto text-[11px] bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                {conversations.length}
              </span>
            )}
          </div>
          <InboxList
            conversations={conversations}
            loading={loadingConvs}
            onSelect={handleSelectConversation}
            activeId={activeConversationId}
            userId={user?.id}
          />
        </div>

        {/* Messaging Chat Frame Screen Area view container */}
        <div
          className={`flex-1 flex flex-col min-h-0 ${
            mobileShowChat ? "flex" : "hidden md:flex"
          }`}>
          {activeConversationId && user ? (
            <ChatScreen
              conversationId={activeConversationId}
              user={user}
              onBack={handleBack}
              listingContactNumber={activeListingContact}
              listingTitle={activeListingTitle}
              listingImage={activeListingImage}
              listingId={activeListingId}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400 select-none bg-gray-50/20">
              <MessageSquare className="w-14 h-14 text-gray-200/70" />
              <p className="text-sm font-bold text-gray-600">
                Select an Inbox thread channel
              </p>
              <p className="text-xs text-gray-400 font-medium">
                Pick an active communication block from the side menu window
                panel.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
