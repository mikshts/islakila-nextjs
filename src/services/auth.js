import { supabase } from "@/lib/supabase";

// Function to trigger Google OAuth Login
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // This redirects the user back to your site after completing Google login
        redirectTo: window.location.origin,
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    throw error;
  }
}

// Function to sign out
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error signing out:", error.message);
}
