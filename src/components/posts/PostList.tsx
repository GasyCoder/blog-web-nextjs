// src/components/posts/PostList.tsx

import { Post } from '@/lib/types';
import PostCard from './PostCard';

interface PostListProps {
  posts: Post[];
  emptyMessage?: string;
}

export default function PostList({
  posts,
  emptyMessage = 'Aucun article trouvé.',
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}