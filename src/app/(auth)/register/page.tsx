// src/app/(auth)/register/page.tsx

'use client';

import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { RegisterData } from '@/lib/types';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, error, clearError } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterData) => {
    setIsLoading(true);
    clearError();

    try {
      await registerUser(data);
      router.push('/');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Inscription</CardTitle>
        <CardDescription className="text-center">
          Créez votre compte pour commencer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <Input
            {...register('name', {
              required: 'Le nom est requis',
              minLength: {
                value: 2,
                message: 'Le nom doit contenir au moins 2 caractères',
              },
            })}
            label="Nom complet"
            placeholder="Jean Dupont"
            error={errors.name?.message}
          />

          <Input
            {...register('email', {
              required: 'L\'email est requis',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email invalide',
              },
            })}
            label="Email"
            type="email"
            placeholder="votre@email.com"
            error={errors.email?.message}
          />

          <Input
            {...register('password', {
              required: 'Le mot de passe est requis',
              minLength: {
                value: 8,
                message: 'Le mot de passe doit contenir au moins 8 caractères',
              },
            })}
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
          />

          <Input
            {...register('password_confirmation', {
              required: 'La confirmation est requise',
              validate: (value) =>
                value === password || 'Les mots de passe ne correspondent pas',
            })}
            label="Confirmer le mot de passe"
            type="password"
            placeholder="••••••••"
            error={errors.password_confirmation?.message}
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            S'inscrire
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Déjà un compte ?{' '}
            </span>
            <Link href="/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}