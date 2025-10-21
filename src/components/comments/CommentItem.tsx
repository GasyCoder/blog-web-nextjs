// src/components/comments/CommentItem.tsx

import Image from 'next/image';
import { Comment } from '@/lib/types';
import { formatRelativeDate, getImageUrl } from '@/lib/utils';
import { useState } from 'react';
import Button from '../ui/Button';
import { MessageSquare } from 'lucide-react';
import CommentForm from './CommentForm';

interface CommentItemProps {
  comment: Comment;
  postId: number;
}

export default function CommentItem({ comment, postId }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        {comment.user.avatar && (
          <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={getImageUrl(comment.user.avatar)}
              alt={comment.user.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{comment.user.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatRelativeDate(comment.created_at)}
              </span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>

          <div className="mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Répondre
            </Button>
          </div>

          {showReplyForm && (
            <div className="mt-4">
              <CommentForm
                postId={postId}
                parentId={comment.id}
                onSuccess={() => setShowReplyForm(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-14 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
}