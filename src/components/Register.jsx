import React from "react";

function Register() {
  return (
    <div className="min-h-screen flex">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className="hidden md:block h-screen">
            <img src="src/assets/360_F_198247162_JwrVkhqowZb4NJC24156nV6QYRhsV8Qf.jpg" alt="register image" className="h-full w-full object-cover"/>
        </div>
        <div className="flex flex-col justify-center items-center text-white p-4 md:p-8 space-y-4 md:space-y-6 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Register</h1>
            <h3 className="text-base md:text-lg mb-4 md:mb-6 text-center">Create your account to get started</h3>
            
            <div className="w-full md:w-4/5 max-w-md px-4 md:px-0">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center mb-6">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm">I agree to the Terms and Conditions</label>
              </div>
              
              <button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
              >
                Register
              </button>
              
              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account? <a href="#" className="text-purple-400 hover:text-purple-300">Login</a>
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Register;