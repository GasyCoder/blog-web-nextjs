
// src/app/(auth)/login/page.tsx

'use client';

import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { LoginCredentials } from '@/lib/types';

export default function LoginPage() {
  const router = useRouter();
  const { login, error, clearError } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    clearError();

    try {
      await login(data);
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Connexion</CardTitle>
        <CardDescription className="text-center">
          Connectez-vous à votre compte
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
            })}
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Se connecter
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Pas encore de compte ?{' '}
            </span>
            <Link href="/register" className="text-primary hover:underline">
              S'inscrire
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}