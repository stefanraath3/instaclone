"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/supabase/client";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data } = await getSession();
      if (data.session) {
        router.push("/feed");
      } else {
        router.push("/login");
      }
    }
    checkAuth();
  }, [router]);

  return <div>Loading...</div>;
}
