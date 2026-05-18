import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError('');
    setIsSubmitting(true);
    
    const result = await login(data.email, data.password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setServerError(result.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-luxury-beige">
      {/* Left Column: Cover (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col justify-between p-12 bg-luxury-black text-luxury-white relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-sm tracking-widest uppercase text-luxury-gold">Boutique Edition</span>
          <h1 className="text-5xl font-serif tracking-tight mt-4 text-luxury-white">Gown Galleria</h1>
        </div>
        <div className="relative z-10 border-t border-luxury-muted/30 pt-6">
          <p className="text-sm text-luxury-muted italic">"Where timeless elegance meets digital precision orchestration."</p>
        </div>
      </div>

      {/* Right Column: Form Workspace */}
      <div className="flex items-center justify-center p-8 md:p-16 bg-luxury-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif text-luxury-black tracking-tight">Management Terminal</h2>
            <p className="text-sm text-luxury-muted mt-2">Provide administrative clearances to enter the dashboard.</p>
          </div>

          {serverError && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-sm text-red-700 rounded">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-2">Email Directory Address</label>
              <input
                type="email"
                {...register('email', { required: 'Email coordinates are required' })}
                className={`w-full px-4 py-3 bg-luxury-beige/40 border ${errors.email ? 'border-red-400' : 'border-luxury-muted/20'} rounded text-luxury-black focus:outline-none focus:border-luxury-gold transition-colors text-sm`}
                placeholder="admin@gowngalleria.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-2">Security Password Token</label>
              <input
                type="password"
                {...register('password', { required: 'Security code is required' })}
                className={`w-full px-4 py-3 bg-luxury-beige/40 border ${errors.password ? 'border-red-400' : 'border-luxury-muted/20'} rounded text-luxury-black focus:outline-none focus:border-luxury-gold transition-colors text-sm`}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-luxury-black text-luxury-white font-semibold py-3 px-4 rounded text-sm hover:bg-luxury-gold hover:text-luxury-black transition-all tracking-wider uppercase"
            >
              {isSubmitting ? 'Verifying Authorization...' : 'Authenticate & Enter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

