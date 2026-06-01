"use client";

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import { Waves, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { signInWithGoogle } from "@/services/auth";

export const LoginPage = memo(() => {
  const router = useRouter();

  // Local Component Form States
  const [mode, setMode] = useState("login"); // "login" | "signup" | "forgot"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email and Password Auth Operations handled directly via Supabase Client
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (mode === "login") {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (loginError) throw loginError;

        router.push("/"); // Secure Next.js redirect to your root homepage
        router.refresh();
      } else if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            // Point the redirect loop back to your local port context or live domain
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (signUpError) throw signUpError;

        setSuccessMessage(
          "Account initialized! Check your inbox to verify your email.",
        );
        setEmail("");
        setPassword("");
        setMode("login");
      } else if (mode === "forgot") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: `${window.location.origin}/login/reset`,
          },
        );
        if (resetError) throw resetError;

        setSuccessMessage(
          "Password recovery link dispatched! Check your mail tabs.",
        );
        setMode("login");
      }
    } catch (err) {
      // Clean up descriptive messages based on typical database triggers
      if (err.message === "User already registered") {
        setError("This email is already registered. Please sign in instead.");
      } else if (err.message === "Invalid login credentials") {
        setError("Incorrect email or password. Please try again.");
      } else if (err.message.includes("Email not confirmed")) {
        setError(
          "Please check your inbox and confirm your email before signing in.",
        );
      } else {
        setError(err.message || "An authentication error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuthClick = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || "Google Authentication failure occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 font-sans bg-gray-50/50">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 p-8 shadow-xl shadow-gray-100/50">
        {/* Top Header Logo Panel */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Waves className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {mode === "login" && "Welcome back"}
            {mode === "signup" && "Create account"}
            {mode === "forgot" && "Reset Password"}
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            {mode === "login" && "Sign in to your Islakila account"}
            {mode === "signup" && "Join Bantayan's #1 property marketplace"}
            {mode === "forgot" && "Enter your email to get a recovery link"}
          </p>
        </div>

        {mode !== "forgot" && (
          <>
            <button
              onClick={handleGoogleAuthClick}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-bold py-3 px-4 rounded-2xl text-sm hover:bg-gray-50 active:bg-gray-100 transition-all shadow-xs disabled:opacity-60 mb-5 cursor-pointer">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center mb-5 select-none">
              <div className="flex-grow border-t border-gray-100" />
              <span className="mx-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                or with email
              </span>
              <div className="flex-grow border-t border-gray-100" />
            </div>
          </>
        )}

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-3.5">
          {error && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold px-3 py-2.5 rounded-xl">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold px-3 py-2.5 rounded-xl">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-emerald-500" />
              {successMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {mode !== "forgot" && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setSuccessMessage("");
                      setMode("forgot");
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all pr-10 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold text-sm hover:bg-blue-700 active:bg-blue-800 active:scale-[0.99] transition-all shadow-md shadow-blue-200/50 disabled:opacity-60 flex items-center justify-center gap-2 mt-2 cursor-pointer">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "login" && "Sign In"}
            {mode === "signup" && "Create Account"}
            {mode === "forgot" && "Send Reset Link"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6 font-medium">
          {mode === "forgot" ? (
            <button
              type="button"
              onClick={() => {
                setError("");
                setSuccessMessage("");
                setMode("login");
              }}
              className="text-blue-600 font-bold hover:underline cursor-pointer">
              Back to Login
            </button>
          ) : (
            <>
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setError("");
                  setSuccessMessage("");
                }}
                className="text-blue-600 font-bold hover:underline cursor-pointer">
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

LoginPage.displayName = "LoginPage";
export default LoginPage;
