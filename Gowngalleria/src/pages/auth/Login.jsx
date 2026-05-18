import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getHomePathForRole } from '../../utils/auth';

// Edit branding and copy here
const LOGIN = {
  brand: 'Gown Galleria',
  tagline: 'Welcome back',
  subtitle: 'Log in to manage your shop.',
  emailLabel: 'Email or username',
  passwordLabel: 'Password',
  emailPlaceholder: 'you@gowngalleria.com',
  submitLabel: 'Log in',
  submitLoadingLabel: 'Logging in...',
  rememberMe: 'Remember me',
  forgotPassword: 'Forgot password?',
  signupPrompt: "Don't have an account?",
  signupLink: 'Sign up',
  backgroundImage: '/images/gown-shop-background.png',
};

const inputClass = (hasError) =>
  `w-full mt-2 h-12 px-4 rounded-xl bg-luxury-white text-luxury-black placeholder-luxury-muted/70 border focus:outline-none focus:ring-2 focus:ring-luxury-brown/40 focus:border-luxury-brown transition text-sm ${
    hasError ? 'border-red-400' : 'border-luxury-muted/30'
  }`;

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: localStorage.getItem('gg_remember_email') || '',
    },
  });

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

    const result = await login(data.email, data.password);
    setIsSubmitting(false);

    if (result.success) {
      if (rememberMe) {
        localStorage.setItem('gg_remember_email', data.email);
      } else {
        localStorage.removeItem('gg_remember_email');
      }
      navigate(getHomePathForRole(result.user.role), { replace: true });
    } else {
      setServerError(result.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${LOGIN.backgroundImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-luxury-brown-light/55" aria-hidden />

      <div className="relative z-10 w-full max-w-md bg-luxury-beige/95 backdrop-blur-md border border-luxury-brown-light/25 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-[2.75rem] leading-none font-medium tracking-wide">
            <span className="text-luxury-brown-light">Gown</span>{' '}
            <span className="italic text-luxury-brown-dark">Galleria</span>
          </h1>
          <p className="font-sans text-luxury-brown text-sm mt-3 font-medium tracking-wide">
            {LOGIN.tagline}
          </p>
          <p className="font-sans text-luxury-muted text-xs mt-2">{LOGIN.subtitle}</p>
        </div>

        {serverError && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-luxury-black">{LOGIN.emailLabel}</label>
            <input
              type="text"
              {...register('email', { required: 'Email or username is required' })}
              placeholder={LOGIN.emailPlaceholder}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-luxury-black">{LOGIN.passwordLabel}</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              placeholder="••••••••"
              className={inputClass(errors.password)}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-luxury-muted cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-luxury-brown"
              />
              {LOGIN.rememberMe}
            </label>
            <button type="button" className="text-luxury-brown hover:text-luxury-brown-dark transition">
              {LOGIN.forgotPassword}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-luxury-brown text-luxury-white font-semibold hover:bg-luxury-brown-dark active:scale-[0.98] transition disabled:opacity-60"
          >
            {isSubmitting ? LOGIN.submitLoadingLabel : LOGIN.submitLabel}
          </button>
        </form>

        <p className="text-center text-luxury-muted text-sm mt-6">
          {LOGIN.signupPrompt}{' '}
          <Link
            to="/register"
            className="text-luxury-brown font-medium hover:text-luxury-brown-dark hover:underline transition"
          >
            {LOGIN.signupLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
