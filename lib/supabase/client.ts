import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (data.user) {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data.user.id, email: data.user.email }),
      });
      if (!response.ok) {
        console.error(
          "Failed to create user in database:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error creating user in database:", error);
    }
  }
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Supabase user:", user);
  if (user) {
    try {
      const response = await fetch(`/api/users/${user.id}`);
      console.log("User API response status:", response.status);
      if (response.ok) {
        const userData = await response.json();
        console.log("User data from API:", userData);
        return userData;
      } else if (response.status === 404) {
        // User exists in Supabase but not in our database, create them
        const createResponse = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id, email: user.email }),
        });
        if (createResponse.ok) {
          return await createResponse.json();
        } else {
          console.error("Failed to create user:", await createResponse.text());
        }
      } else {
        console.error("Failed to fetch user:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  return null;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
}
