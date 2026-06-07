import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';

import { signupSchema, type SignupFormValues } from '../lib/validation';
import { useRegister } from '../hooks/useAuth';
import { getApiErrorMessage } from '../api/errors';
import { AuthCard } from '../components/ui/AuthCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';

export function SignupPage() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = handleSubmit((values) => {
    registerMutation.mutate(values, {
      onSuccess: () => navigate('/', { replace: true }),
    });
  });

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start your personalized crypto journey"
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand hover:text-brand-hover">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {registerMutation.isError && <Alert message={getApiErrorMessage(registerMutation.error)} />}

        <Input
          id="name"
          type="text"
          label="Name"
          placeholder="Satoshi Nakamoto"
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button type="submit" className="w-full" isLoading={registerMutation.isPending}>
          Create account
        </Button>
      </form>
    </AuthCard>
  );
}
