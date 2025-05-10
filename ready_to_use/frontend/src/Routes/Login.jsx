import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Api from '##/src/request.js';
import { setComponentDisplayName } from '##/src/utility/utility.js';
import { Mail, Lock, Github, Facebook, LucideUser } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setMe } from '../store/slices/userSlice';
import { setAuthenticated } from '../store/slices/authSlice';

function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await Api.fetch('/api/auth/login', {
        method: 'POST',
        body: { email: form.email, password: form.password }
      });
      console.log(
        'User logged in successfully:', user
      );

      dispatch(setMe(user))
      dispatch(setAuthenticated(true))
      window.location.href = '/'
      // Assume backend sets session/cookie or returns token
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
            <LucideUser className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Sign in to your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex items-center border-2 rounded-lg p-3 mb-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:shadow-lg hover:border-gray-400">
              <Mail className="h-5 w-5 text-indigo-500 mr-3" />
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center border-2 rounded-lg p-3 mb-4 transition-all duration-300 focus-within:border-indigo-500 focus-within:shadow-lg hover:border-gray-400">
              <Lock className="h-5 w-5 text-indigo-500 mr-3" />
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-4 py-3 border-0 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-500 hover:scale-[1.02] shadow-xl"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-white border-2 border-gray-200 hover:bg-indigo-50 text-gray-700 font-medium shadow-sm transition-all duration-300"
          >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="h-5 w-5" />
            Continue with Google
          </button>
          <button
            onClick={() => handleSocialLogin('facebook')}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-white border-2 border-gray-200 hover:bg-indigo-50 text-gray-700 font-medium shadow-sm transition-all duration-300"
          >
            <Facebook className="h-5 w-5 text-blue-600" />
            Continue with Facebook
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-white border-2 border-gray-200 hover:bg-indigo-50 text-gray-700 font-medium shadow-sm transition-all duration-300"
          >
            <Github className="h-5 w-5 text-gray-800" />
            Continue with GitHub
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          New here?{' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-purple-600 transition-colors duration-200">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

setComponentDisplayName(Login, 'Login');
export default Login;
