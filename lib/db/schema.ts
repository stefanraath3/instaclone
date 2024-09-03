import { pgTable, uuid, text, timestamp, unique } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(), // Make sure this line exists
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  website: text("website"),
  bio: text("bio"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  caption: text("caption"),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const likes = pgTable(
  "likes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userPostUnique: unique().on(table.userId, table.postId),
  })
);

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  postId: uuid("post_id")
    .notNull()
    .references(() => posts.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const follows = pgTable(
  "follows",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    followerId: uuid("follower_id")
      .notNull()
      .references(() => users.id),
    followingId: uuid("following_id")
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    followerFollowingUnique: unique().on(table.followerId, table.followingId),
  })
);
