import { AuthWrapper } from "@/components/auth/with-auth";
import Feed from "@/components/feed/feed";

export default function FeedPage() {
  return (
    <AuthWrapper>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Feed</h1>
        <Feed />
      </main>
    </AuthWrapper>
  );
}
