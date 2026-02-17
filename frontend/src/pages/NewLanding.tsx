import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewLanding() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {/* Header */}
      <header className="border-b border-purple-700/30 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">AF</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                AegisFlood
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#features" className="text-purple-200 hover:text-cyan-300 transition-colors">Features</a>
              <a href="#about" className="text-purple-200 hover:text-cyan-300 transition-colors">How It Works</a>
              <button 
                onClick={() => navigate('/login')}
                className="px-4 py-2 border border-purple-400/50 rounded-lg text-purple-200 hover:text-white hover:border-cyan-400 transition-colors backdrop-blur-sm bg-white/10"
              >
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-900/50 to-pink-500/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-6xl px-6">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-cyan-400/30 rounded-full text-cyan-200 text-sm font-medium backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Advanced AI-Powered Flood Prediction
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Stay Ahead of
            </span>
            <br />
            <span className="text-white drop-shadow-lg">the Waters</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Protect your community with real-time flood predictions, intelligent alerts, and comprehensive monitoring powered by advanced AI technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-cyan-400 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Get Started Free
            </button>
            
            <button className="border border-cyan-400/50 text-cyan-200 px-8 py-4 rounded-xl font-medium text-lg hover:text-white hover:border-cyan-300 transition-colors backdrop-blur-sm bg-white/10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </button>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-purple-900/30 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6 text-center hover:bg-purple-800/40 transition-colors">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2">99.2%</div>
              <div className="text-purple-200">Prediction Accuracy</div>
            </div>
            <div className="bg-purple-900/30 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6 text-center hover:bg-purple-800/40 transition-colors">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-purple-200">Real-time Monitoring</div>
            </div>
            <div className="bg-purple-900/30 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-6 text-center hover:bg-purple-800/40 transition-colors">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2">10M+</div>
              <div className="text-purple-200">People Protected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-br from-purple-900/80 to-indigo-900/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Advanced AI-Powered <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Flood Prediction</span>
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Our cutting-edge system combines real-time environmental data with machine learning algorithms to deliver precise flood predictions and automated community alerts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-800/40 border border-cyan-400/30 rounded-xl p-8 text-center hover:bg-purple-700/50 transition-colors backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Real-Time Data Collection</h3>
              <p className="text-purple-200 leading-relaxed">
                Continuous monitoring of weather patterns, river levels, rainfall intensity, and soil saturation across multiple sensor networks.
              </p>
            </div>

            <div className="bg-purple-800/40 border border-cyan-400/30 rounded-xl p-8 text-center hover:bg-purple-700/50 transition-colors backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">AI Prediction Engine</h3>
              <p className="text-purple-200 leading-relaxed">
                Advanced machine learning models analyze historical patterns and current conditions to predict flood risks with 99.2% accuracy.
              </p>
            </div>

            <div className="bg-purple-800/40 border border-cyan-400/30 rounded-xl p-8 text-center hover:bg-purple-700/50 transition-colors backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.828 2.828M9 3l1 2.828L12.828 3M19.071 7.929l-2.828 2.828M15 3l-2.828 2.828L9.343 3M7 17v5l-5-5h5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Community Alerts</h3>
              <p className="text-purple-200 leading-relaxed">
                Instant notifications to residents, emergency services, and local authorities with actionable evacuation and safety instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="py-24 px-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              How <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">AegisFlood</span> Works
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive flood prediction system operates through four key stages to ensure maximum protection for your community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Data Collection</h3>
              <p className="text-purple-200 leading-relaxed">
                IoT sensors and satellite data continuously monitor weather conditions, water levels, and environmental factors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">AI Analysis</h3>
              <p className="text-purple-200 leading-relaxed">
                Machine learning algorithms process data patterns to identify potential flood risks and calculate probability scores.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Alert Generation</h3>
              <p className="text-purple-200 leading-relaxed">
                Automated alerts are generated and sent to community members, authorities, and emergency services instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Community Response</h3>
              <p className="text-purple-200 leading-relaxed">
                Residents receive actionable instructions while authorities coordinate evacuation and emergency response efforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-900/80 to-indigo-900/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Trusted by <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Communities</span> Worldwide
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              See what community leaders and emergency responders are saying about AegisFlood's life-saving technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-800/40 border border-cyan-400/30 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-lg">MJ</span>
                </div>
                <div>
                  <div className="font-bold text-white">Mayor Jennifer Collins</div>
                  <div className="text-purple-200">Riverside County</div>
                </div>
              </div>
              <p className="text-purple-100 leading-relaxed mb-4">
                "AegisFlood has transformed our emergency preparedness. The early warning system gave us 6 hours to evacuate safely during last month's flash flood. This technology saves lives."
              </p>
              <div className="flex text-cyan-300">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-purple-800/40 border border-cyan-400/30 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-lg">DR</span>
                </div>
                <div>
                  <div className="font-bold text-white">Dr. Robert Chen</div>
                  <div className="text-purple-200">Emergency Response Director</div>
                </div>
              </div>
              <p className="text-purple-100 leading-relaxed mb-4">
                "The accuracy of AegisFlood's predictions is remarkable. We've been able to coordinate resources more effectively and minimize property damage by 40% in our region."
              </p>
              <div className="flex text-cyan-300">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-purple-800/40 border border-cyan-400/30 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-lg">SK</span>
                </div>
                <div>
                  <div className="font-bold text-white">Sarah Kim</div>
                  <div className="text-purple-200">Community Safety Coordinator</div>
                </div>
              </div>
              <p className="text-purple-100 leading-relaxed mb-4">
                "Our residents feel much safer knowing AegisFlood is monitoring our area 24/7. The mobile alerts are clear, timely, and have helped us build a more resilient community."
              </p>
              <div className="flex text-cyan-300">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Protect Your Community <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Today</span>
          </h2>
          <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of communities worldwide who trust AegisFlood to keep their residents safe. Get started with our free trial and experience the peace of mind that comes with advanced flood prediction.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl backdrop-blur-sm"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-cyan-400/50 hover:border-cyan-400 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-purple-800/50 backdrop-blur-sm">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 border-t border-cyan-400/30 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">AF</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  AegisFlood
                </h3>
              </div>
              <p className="text-purple-200 leading-relaxed mb-6 max-w-md">
                Protecting communities worldwide with AI-powered flood prediction and real-time emergency alerts.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-purple-800/50 border border-cyan-400/30 rounded-lg flex items-center justify-center hover:bg-purple-700/50 transition-colors cursor-pointer backdrop-blur-sm">
                  <span className="text-cyan-300">📧</span>
                </div>
                <div className="w-10 h-10 bg-purple-800/50 border border-cyan-400/30 rounded-lg flex items-center justify-center hover:bg-purple-700/50 transition-colors cursor-pointer backdrop-blur-sm">
                  <span className="text-cyan-300">🐦</span>
                </div>
                <div className="w-10 h-10 bg-purple-800/50 border border-cyan-400/30 rounded-lg flex items-center justify-center hover:bg-purple-700/50 transition-colors cursor-pointer backdrop-blur-sm">
                  <span className="text-cyan-300">💼</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-purple-200 hover:text-cyan-300 transition-colors">Features</a></li>
                <li><a href="#" className="text-purple-200 hover:text-cyan-300 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-purple-200 hover:text-cyan-300 transition-colors">API</a></li>
                <li><a href="#" className="text-purple-200 hover:text-cyan-300 transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-purple-200 hover:text-cyan-300 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-purple-200 hover:text-cyan-300 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-purple-200 hover:text-cyan-300 transition-colors">Status</a></li>
                <li><a href="#" className="text-purple-200 hover:text-cyan-300 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-cyan-400/30 mt-12 pt-8 text-center">
            <p className="text-purple-200">
              © 2024 AegisFlood. All rights reserved. Built with ❤️ for safer communities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
