import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', { email, password });    
    // Basic validation - in real app you'd validate properly
    if (email.trim() && password.trim()) {
      console.log('Validation passed, calling onSignIn');
      onSignIn();
    } else {
      console.log('Validation failed');
      alert('Please enter both email and password');
    }
  };

  const handleButtonClick = () => {
    console.log('Button clicked directly');
    if (email.trim() && password.trim()) {
      onSignIn();
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">PromoPilot</h1>
          <p className="text-gray-600 mt-2">Welcome back! Sign in to your account</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            onClick={handleButtonClick}
          >
            Sign In
          </Button>
          
          <div className="text-center space-y-2">
            <button 
              type="button"
              onClick={() => alert('Password reset functionality would go here')}
              className="text-sm text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
            >
              Forgot your password?
            </button>
            <p className="text-sm text-gray-600">
              Don't have an account? 
              <button 
                type="button"
                onClick={() => alert('Sign up functionality would go here')}
                className="text-blue-600 hover:underline ml-1 bg-transparent border-none cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
