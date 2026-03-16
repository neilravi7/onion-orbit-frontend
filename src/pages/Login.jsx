import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, UtensilsCrossed, Loader } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('customer');
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      console.log(`${userType} login:`, data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (userType === 'vendor') {
        navigate('/vendor/profile-setup');
      } else {
        navigate('/customer/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white flex items-center justify-center px-4 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl">
        {/* Left Side - Illustration */}
        <motion.div
          className="hidden lg:flex items-center justify-center"
          variants={itemVariants}
        >
          <div className="relative w-full h-full max-w-md">
            <motion.img
              src="/auth-illustration.jpg"
              alt="Food delivery illustration"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-2xl"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          className="w-full max-w-md mx-auto lg:mx-0 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl mb-6 shadow-lg">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to manage your orders</p>
          </motion.div>

          {/* User Type Toggle */}
          <motion.div
            className="flex gap-3 mb-8 bg-gray-100 p-1.5 rounded-xl"
            variants={itemVariants}
          >
            {['customer', 'vendor'].map((type) => (
              <motion.button
                key={type}
                onClick={() => setUserType(type)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${
                  userType === type
                    ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg'
                    : 'bg-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 font-medium">{errors.email.message}</p>
              )}
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  className="w-full pl-12 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2 font-medium">{errors.password.message}</p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold rounded-xl transition shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </motion.form>

          {/* Footer */}
          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-600 hover:text-orange-700 font-bold transition">
                Create one
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
