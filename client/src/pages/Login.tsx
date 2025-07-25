import { useState, useEffect } from 'react';
import { getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { auth, signInWithGoogle } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { useLocation } from 'wouter';

export default function Login() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Handle redirect result from Google sign-in
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          const user = result.user;
          
          toast({
            title: "Login Successful",
            description: `Welcome, ${user.displayName || user.email}!`,
          });
          
          setLocation('/');
        }
      })
      .catch((error) => {
        console.error('Auth error:', error);
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive"
        });
      });
  }, [toast, setLocation]);

  useEffect(() => {
    if (user) {
      setLocation('/');
    }
  }, [user, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      toast({
        title: "Configuration Error",
        description: "Firebase configuration is required. Please set up your Firebase keys.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // In production, implement email/password authentication here
      toast({
        title: "Feature Coming Soon",
        description: "Email/password authentication will be implemented with Firebase Auth",
      });
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      toast({
        title: "Configuration Error",
        description: "Firebase configuration is required. Please set up your Firebase keys.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Sign-in Error",
        description: error.message,
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-2">
            Join Our Community
          </h2>
          <p className="text-gray-600">Sign up to rent equipment or list your own</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Tab Navigation */}
          <div className="flex mb-6 border-b border-gray-200">
            <button 
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3 text-center font-medium ${
                !isSignUp 
                  ? 'text-forest-green border-b-2 border-forest-green' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3 text-center font-medium ${
                isSignUp 
                  ? 'text-forest-green border-b-2 border-forest-green' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone/Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isSignUp ? 'Email Address' : 'Phone Number or Email'}
              </label>
              <input 
                type={isSignUp ? 'email' : 'text'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isSignUp ? 'email@example.com' : '+91 90400****99 or email@example.com'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent text-lg"
                required
              />
            </div>

            {/* Phone Input for Sign Up */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 90400****99"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent text-lg"
                />
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent text-lg pr-12"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Firebase Auth Integration Notice */}
            {!import.meta.env.VITE_FIREBASE_API_KEY && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-blue-600 mr-3 mt-1"></i>
                  <div>
                    <h5 className="font-medium text-blue-800">Firebase Authentication</h5>
                    <p className="text-sm text-blue-700 mt-1">
                      Please configure Firebase authentication keys to enable login functionality.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sign In Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-forest-green text-white px-4 py-3 rounded-lg font-medium text-lg hover:bg-sage-green transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>

            {/* Or Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <i className="fab fa-google text-red-500 mr-2"></i>
                Google
              </button>
              <button 
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <i className="fas fa-phone text-forest-green mr-2"></i>
                OTP
              </button>
            </div>

            {!isSignUp && (
              <div className="text-center">
                <a href="#" className="text-sm text-forest-green hover:underline">
                  Forgot your password?
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
