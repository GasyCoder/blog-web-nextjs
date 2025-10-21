// src/components/comments/CommentForm.tsx

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { commentsApi } from '@/lib/api';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import { CreateCommentData } from '@/lib/types';

interface CommentFormProps {
  postId: number;
  parentId?: number;
  onSuccess?: () => void;
}

export default function CommentForm({
  postId,
  parentId,
  onSuccess,
}: CommentFormProps) {
  const { isAuthenticated } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCommentData>();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Vous devez être connecté pour commenter.
      </div>
    );
  }

  const onSubmit = async (data: CreateCommentData) => {
    setIsSubmitting(true);
    try {
      await commentsApi.create(postId, {
        ...data,
        parent_id: parentId,
      });
      setSuccess(true);
      reset();
      setTimeout(() => {
        setSuccess(false);
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textarea
        {...register('content', {
          required: 'Le commentaire est requis',
          minLength: {
            value: 3,
            message: 'Le commentaire doit contenir au moins 3 caractères',
          },
        })}
        label={parentId ? 'Votre réponse' : 'Votre commentaire'}
        placeholder="Écrivez votre commentaire..."
        rows={4}
        error={errors.content?.message}
      />

      {success && (
        <p className="text-sm text-green-600">
          Commentaire envoyé ! Il sera visible après modération.
        </p>
      )}

      <Button type="submit" isLoading={isSubmitting}>
        {parentId ? 'Répondre' : 'Commenter'}
      </Button>
    </form>
  );
}
