// src/app/posts/[slug]/page.tsx

import { postsApi } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, getImageUrl } from '@/lib/utils';
import Container from '@/components/layout/Container';
import Badge from '@/components/ui/Badge';
import { Clock, Eye, Calendar, User } from 'lucide-react';
import CommentForm from '@/components/comments/CommentForm';
import CommentItem from '@/components/comments/CommentItem';

interface PostDetailProps {
  params: {
    slug: string;
  };
}

export default async function PostDetail({ params }: PostDetailProps) {
  let post;

  try {
    post = await postsApi.getBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  return (
    <article>
      {/* Hero Image */}
      {post.featured_image && (
        <div className="relative h-[400px] w-full">
          <Image
            src={getImageUrl(post.featured_image)}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <Container className="max-w-4xl">
        {/* Category Badge */}
        <div className="mb-4">
          <Link href={`/?category=${post.category.slug}`}>
            <Badge
              style={{ backgroundColor: post.category.color }}
              className="text-white"
            >
              {post.category.name}
            </Badge>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span>{post.user.name}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(post.published_at || post.created_at)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{post.reading_time} min de lecture</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            <span>{post.views_count} vues</span>
          </div>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Link key={tag.id} href={`/?tag=${tag.slug}`}>
                <Badge variant="secondary">#{tag.name}</Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        {/* Author Bio */}
        <div className="border-t border-b py-8 mb-12">
          <div className="flex items-start space-x-4">
            {post.user.avatar && (
              <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={getImageUrl(post.user.avatar)}
                  alt={post.user.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg mb-1">{post.user.name}</h3>
              {post.user.bio && (
                <p className="text-muted-foreground">{post.user.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Commentaires ({post.comments_count || 0})
          </h2>

          {/* Comment Form */}
          <div className="mb-8">
            <CommentForm postId={post.id} />
          </div>

          {/* Comments List */}
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} postId={post.id} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Aucun commentaire pour le moment. Soyez le premier à commenter !
            </p>
          )}
        </div>
      </Container>
    </article>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostDetailProps) {
  try {
    const post = await postsApi.getBySlug(params.slug);
    return {
      title: post.title,
      description: post.excerpt || post.title,
    };
  } catch (error) {
    return {
      title: 'Article non trouvé',
    };
  }
}