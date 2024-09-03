"use client";

import { useEffect, useState } from "react";
import Post from "./post";
import { motion } from "framer-motion";
import CreatePost from "./create-post";

type Post = {
  id: string;
  username: string;
  userAvatarUrl: string | null;
  imageUrl: string;
  caption: string;
  createdAt: string;
};

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    }
    fetchPosts();
  }, []);

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CreatePost />
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
