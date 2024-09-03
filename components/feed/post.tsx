import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

type PostProps = {
  post: {
    id: string;
    username: string;
    imageUrl: string;
    caption: string;
    likes: number;
  };
};

export default function Post({ post }: PostProps) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4 flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={`https://avatar.vercel.sh/${post.username}`} />
          <AvatarFallback>{post.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{post.username}</span>
      </div>
      <img src={post.imageUrl} alt={post.caption} className="w-full" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className={liked ? "text-red-500" : ""}
            >
              <Heart className={`h-6 w-6 ${liked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button variant="ghost" size="icon">
            <Bookmark className="h-6 w-6" />
          </Button>
        </div>
        <span className="font-semibold block mb-2">{likes} likes</span>
        <p>
          <span className="font-semibold mr-2">{post.username}</span>
          {post.caption}
        </p>
      </div>
    </motion.div>
  );
}
