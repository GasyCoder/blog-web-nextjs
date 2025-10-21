// src/components/posts/PostCard.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';
import { formatRelativeDate, getImageUrl } from '@/lib/utils';
import { Clock, Eye, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {post.featured_image && (
        <Link href={`/posts/${post.slug}`}>
          <div className="relative h-48 w-full">
            <Image
              src={getImageUrl(post.featured_image)}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      )}

      <CardContent className="p-6">
        {/* Category Badge */}
        <div className="mb-3">
          <Link href={`/categories/${post.category.slug}`}>
            <Badge
              style={{ backgroundColor: post.category.color }}
              className="text-white"
            >
              {post.category.name}
            </Badge>
          </Link>
        </div>

        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Badge variant="secondary" className="text-xs">
                  #{tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.reading_time} min
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {post.views_count}
          </div>
          {post.comments_count !== undefined && (
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.comments_count}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        {/* Author */}
        <div className="flex items-center space-x-2">
          {post.user.avatar && (
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={getImageUrl(post.user.avatar)}
                alt={post.user.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="text-sm font-medium">{post.user.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatRelativeDate(post.published_at || post.created_at)}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
