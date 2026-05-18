import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getHomePathForRole } from '../../utils/auth';

const COPY = {
  title: 'Create account',
  subtitle: 'Join Gown Galleria to manage your shop.',
  nameLabel: 'Full name',
  usernameLabel: 'Username',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  confirmLabel: 'Confirm password',
  submitLabel: 'Sign up',
  submitLoadingLabel: 'Creating account...',
  loginPrompt: 'Already have an account?',
  loginLink: 'Log in',
  backgroundImage: '/images/gown-shop-background.png',
};

const inputClass = (hasError) =>
  `w-full mt-2 h-12 px-4 rounded-xl bg-luxury-white text-luxury-black placeholder-luxury-muted/70 border focus:outline-none focus:ring-2 focus:ring-luxury-brown/40 focus:border-luxury-brown transition text-sm ${
    hasError ? 'border-red-400' : 'border-luxury-muted/30'
  }`;

export default function Register() {
  const { register: registerUser, user } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  useEffect(() => {
    if (user) {
      navigate(getHomePathForRole(user.role), { replace: true });
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  const onSubmit = async (data) => {
    setServerError('');
    setIsSubmitting(true);

    const result = await registerUser({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });

    setIsSubmitting(false);

    if (result.success) {
      navigate(getHomePathForRole(result.user.role), { replace: true });
    } else {
      setServerError(result.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${COPY.backgroundImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-luxury-brown-light/55" aria-hidden />

      <div className="relative z-10 w-full max-w-md bg-luxury-beige/95 backdrop-blur-md border border-luxury-brown-light/25 rounded-3xl shadow-2xl p-8 max-h-[95vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h1 className="font-display text-3xl leading-none font-medium tracking-wide">
            <span className="text-luxury-brown-light">Gown</span>{' '}
            <span className="italic text-luxury-brown-dark">Galleria</span>
          </h1>
          <p className="font-sans text-luxury-black text-lg mt-3 font-medium">{COPY.title}</p>
          <p className="font-sans text-luxury-muted text-xs mt-1">{COPY.subtitle}</p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-luxury-black">{COPY.nameLabel}</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={inputClass(errors.name)}
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-luxury-black">{COPY.usernameLabel}</label>
            <input
              type="text"
              {...register('username', {
                required: 'Username is required',
                pattern: { value: /^[a-zA-Z0-9_-]+$/, message: 'Letters, numbers, - and _ only' },
              })}
              className={inputClass(errors.username)}
            />
            {errors.username && (
              <p className="text-xs text-red-600 mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-luxury-black">{COPY.emailLabel}</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className={inputClass(errors.email)}
            />
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-luxury-black">{COPY.passwordLabel}</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters' },
              })}
              className={inputClass(errors.password)}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-luxury-black">{COPY.confirmLabel}</label>
            <input
              type="password"
              {...register('password_confirmation', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              className={inputClass(errors.password_confirmation)}
            />
            {errors.password_confirmation && (
              <p className="text-xs text-red-600 mt-1">{errors.password_confirmation.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-luxury-brown text-luxury-white font-semibold hover:bg-luxury-brown-dark active:scale-[0.98] transition disabled:opacity-60"
          >
            {isSubmitting ? COPY.submitLoadingLabel : COPY.submitLabel}
          </button>
        </form>

        <p className="text-center text-luxury-muted text-sm mt-5">
          {COPY.loginPrompt}{' '}
          <Link
            to="/login"
            className="text-luxury-brown font-medium hover:text-luxury-brown-dark hover:underline transition"
          >
            {COPY.loginLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
