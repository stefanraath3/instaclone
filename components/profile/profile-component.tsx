"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Grid, List } from "lucide-react";

type UserProfile = {
  username: string;
  fullName: string;
  bio: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
};

type Post = {
  id: string;
  username: string;
  imageUrl: string;
  caption: string;
  likes: number;
};

export default function ProfileComponent() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    // Fetch user profile data (to be implemented with real API later)
    const mockProfile: UserProfile = {
      username: "johndoe",
      fullName: "John Doe",
      bio: "Photography enthusiast | Travel lover",
      postsCount: 42,
      followersCount: 1337,
      followingCount: 420,
    };
    setProfile(mockProfile);

    // Fetch user posts (to be implemented with real API later)
    const mockPosts: Post[] = [
      {
        id: "1",
        username: "johndoe",
        imageUrl: "https://picsum.photos/500/500?random=1",
        caption: "Beautiful sunset!",
        likes: 89,
      },
      {
        id: "2",
        username: "johndoe",
        imageUrl: "https://picsum.photos/500/500?random=2",
        caption: "City lights",
        likes: 56,
      },
      // Add more mock posts here
    ];
    setPosts(mockPosts);
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <Avatar className="h-32 w-32 md:h-40 md:w-40 md:mr-8 mb-4 md:mb-0">
          <AvatarImage src={`https://avatar.vercel.sh/${profile.username}`} />
          <AvatarFallback>{profile.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{profile.fullName}</h2>
          <p className="text-gray-600 mb-2">@{profile.username}</p>
          <p className="mb-4">{profile.bio}</p>
          <div className="flex justify-center md:justify-start space-x-4 mb-4">
            <span>
              <strong>{profile.postsCount}</strong> posts
            </span>
            <span>
              <strong>{profile.followersCount}</strong> followers
            </span>
            <span>
              <strong>{profile.followingCount}</strong> following
            </span>
          </div>
          <Button>Edit Profile</Button>
        </div>
      </div>
      <div className="mb-4 flex justify-end">
        <Button variant="ghost" size="icon" onClick={() => setViewMode("grid")}>
          <Grid
            className={`h-6 w-6 ${viewMode === "grid" ? "text-blue-500" : ""}`}
          />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setViewMode("list")}>
          <List
            className={`h-6 w-6 ${viewMode === "list" ? "text-blue-500" : ""}`}
          />
        </Button>
      </div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="aspect-square overflow-hidden rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="object-cover w-full h-full"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={post.imageUrl} alt={post.caption} className="w-full" />
              <div className="p-4">
                <p className="font-semibold mb-2">{post.likes} likes</p>
                <p>
                  <span className="font-semibold mr-2">{post.username}</span>
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
