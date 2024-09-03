"use client";

import { useEffect, useState } from "react";
import Post from "./post";
import { motion } from "framer-motion";

type Post = {
  id: string;
  username: string;
  imageUrl: string;
  caption: string;
  likes: number;
};

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts from API (to be implemented later)
    const mockPosts: Post[] = [
      {
        id: "1",
        username: "user1",
        imageUrl: "https://picsum.photos/500/500?random=1",
        caption: "Beautiful day!",
        likes: 42,
      },
      {
        id: "2",
        username: "user2",
        imageUrl: "https://picsum.photos/500/500?random=2",
        caption: "Amazing view!",
        likes: 28,
      },
      // Add more mock posts here
    ];
    setPosts(mockPosts);
  }, []);

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Post post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}
