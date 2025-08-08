import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import Logo from '../components/Logo';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  
  const { login, register, loading, error, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      if (isLogin) {
        // Login
        await login({ email, password });
        onSignIn();
      } else {
        // Register
        if (!name.trim()) {
          alert('Please enter your name');
          return;
        }
        await register({ email, password, name });
        onSignIn();
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Error is handled by the context and displayed below
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="large" />
          </div>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Welcome back! Sign in to your account' : 'Create your PromoPilot account'}
          </p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <Input 
              label="Full Name" 
              type="text" 
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          
          <Input 
            label="Email" 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input 
            label="Password" 
            type="password" 
            placeholder={isLogin ? "Enter your password" : "Create a password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={loading}
          >
            {loading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>
          
          <div className="text-center space-y-2">
            {isLogin && (
              <button 
                type="button"
                onClick={() => alert('Password reset functionality would go here')}
                className="text-sm text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
              >
                Forgot your password?
              </button>
            )}
            
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button"
                onClick={toggleMode}
                className="text-blue-600 hover:underline ml-1 bg-transparent border-none cursor-pointer"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
