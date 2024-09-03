import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/client";

type DbUser = {
  id: string;
  username: string;
  email: string;
};

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<DbUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.error("Failed to fetch user data");
        // Handle the error, e.g., redirect to login page or show an error message
      }
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      console.error("User not found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, caption, imageUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post created successfully:", data);
        setCaption("");
        setImageUrl("");
        router.refresh();
      } else {
        const errorData = await response.json();
        console.error("Failed to create post:", errorData);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }

    setIsLoading(false);
  };

  if (user === null) {
    return <div>Loading...</div>;
  }

  if (user === undefined) {
    return <div>Error: Failed to load user data</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <Textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Posting..." : "Create Post"}
      </Button>
    </form>
  );
}
