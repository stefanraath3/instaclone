"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/supabase/client";

export function AuthWrapper({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data } = await getSession();
      if (!data.session) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
