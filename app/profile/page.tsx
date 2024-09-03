import { AuthWrapper } from "@/components/auth/with-auth";
import ProfileComponent from "@/components/profile/profile-component";

export default function ProfilePage() {
  return (
    <AuthWrapper>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
        <ProfileComponent />
      </main>
    </AuthWrapper>
  );
}
