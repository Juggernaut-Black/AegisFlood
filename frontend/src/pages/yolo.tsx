import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/shared/Button'
import Card from '../components/shared/Card'
import LocationSelector from '../components/LocationSelector'

const YoloPage = () => {
  const [email, setEmail] = useState('')
  const [selectedLocation, setSelectedLocation] = useState({ state: '', district: '' })
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const navigate = useNavigate()

  const handleLocationChange = (state: string, district: string) => {
    setSelectedLocation({ state, district })
    console.log('Location selected:', { state, district })
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    console.log('Language selected:', language)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email submitted:', email)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 noise-overlay opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
      
      {/* Header */}
      <header className="relative z-20">
        <div className="bg-purple-900/30 border-b border-cyan-400/30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  AegisFlood
                </h1>
              </div>
              <nav className="flex items-center space-x-6">
                <a href="#features" className="text-purple-200 hover:text-cyan-300 transition-colors">Features</a>
                <a href="#how-it-works" className="text-purple-200 hover:text-cyan-300 transition-colors">How It Works</a>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20"></div>
        
        <div className="relative z-10 max-w-6xl px-6 fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-800/40 border border-cyan-400/30 rounded-full text-purple-100 text-sm font-medium shadow-lg backdrop-blur-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Advanced AI-Powered Flood Prediction
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Stay Ahead of
            </span>
            <br />
            <span className="text-white">the Waters</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Protect your community with real-time flood predictions, intelligent alerts, and comprehensive monitoring powered by advanced AI technology.
          </p>
          
          {/* Location and Language Selector */}
          <div className="mb-12">
            <LocationSelector 
              onLocationChange={handleLocationChange}
              onLanguageChange={handleLanguageChange}
              className="justify-center"
            />
            {selectedLocation.state && selectedLocation.district && (
              <p className="mt-4 text-cyan-300 font-medium">
                Monitoring: {selectedLocation.district}, {selectedLocation.state}
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="gradient"
              size="xl" 
              onClick={() => navigate("/home")}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Get Started Free
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card variant="glass" padding="lg" className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2">99.2%</div>
              <div className="text-purple-200">Prediction Accuracy</div>
            </Card>
            <Card variant="glass" padding="lg" className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-purple-200">Real-time Monitoring</div>
            </Card>
            <Card variant="glass" padding="lg" className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2">10M+</div>
              <div className="text-purple-200">People Protected</div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-br from-purple-900/80 to-indigo-900/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-800/40 border border-cyan-400/30 rounded-full text-purple-100 text-sm font-medium shadow-lg backdrop-blur-sm mb-8">
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Advanced AI-Powered <span className="bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Flood Prediction</span>
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Our cutting-edge system combines real-time environmental data with machine learning algorithms to deliver precise flood predictions and automated community alerts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card variant="elevated" padding="lg" hover className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Real-Time Data Collection</h3>
              <p className="text-purple-200 leading-relaxed">
                Continuous monitoring of weather patterns, river levels, rainfall intensity, and soil saturation across multiple sensor networks.
              </p>
            </Card>

            <Card variant="elevated" padding="lg" hover className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">AI Prediction Engine</h3>
              <p className="text-purple-200 leading-relaxed">
                Advanced machine learning models analyze historical patterns and current conditions to predict flood risks with 99.2% accuracy.
              </p>
            </Card>

            <Card variant="elevated" padding="lg" hover className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 17h3m-3 0v5m0-5l-5-5h5v5zm0 0H9m3 0l5-5v5h-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Instant Community Alerts</h3>
              <p className="text-purple-200 leading-relaxed">
                Automated multi-channel notifications via SMS, WhatsApp, and mobile push notifications to keep communities informed and safe.
              </p>
            </Card>
          </div>

          {/* Process Flow */}
          <Card variant="gradient" padding="xl" className="relative overflow-hidden">
            <h3 className="text-3xl font-bold text-center mb-12 text-white">The AegisFlood Process</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg">1</div>
                <h4 className="font-semibold mb-2 text-white">Data Ingestion</h4>
                <p className="text-sm text-purple-200">Collect real-time environmental data from multiple sources</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg">2</div>
                <h4 className="font-semibold mb-2 text-white">AI Analysis</h4>
                <p className="text-sm text-purple-200">Process data through machine learning algorithms</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg">3</div>
                <h4 className="font-semibold mb-2 text-white">Risk Assessment</h4>
                <p className="text-sm text-purple-200">Generate accurate flood risk predictions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg shadow-lg">4</div>
                <h4 className="font-semibold mb-2 text-white">Alert Distribution</h4>
                <p className="text-sm text-purple-200">Send instant alerts to affected communities</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Why Choose AegisFlood?</h2>
            <p className="text-purple-100 text-lg mb-12 max-w-3xl mx-auto">
              AegisFlood offers unparalleled accuracy and reliability in flood prediction, ensuring you're always prepared.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="surface" padding="lg" hover>
              <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-cyan-400/30 to-purple-500/30 flex items-center justify-center">
                <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Accurate Predictions</h3>
              <p className="text-purple-200">
                Our predictions are based on the latest scientific research and real-time data analysis.
              </p>
            </Card>

            <Card variant="surface" padding="lg" hover>
              <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-emerald-400/30 to-cyan-500/30 flex items-center justify-center">
                <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5zM12 17h3m-3 0v5m0-5l-5-5h5v5zm0 0H9m3 0l5-5v5h-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Reliable Alerts</h3>
              <p className="text-purple-200">Receive timely and reliable alerts to take necessary precautions.</p>
            </Card>

            <Card variant="surface" padding="lg" hover>
              <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-pink-400/30 to-purple-500/30 flex items-center justify-center">
                <svg className="w-16 h-16 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">User-Friendly Interface</h3>
              <p className="text-purple-200">
                Our app is designed for ease of use, providing clear and actionable information.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-cyan-400/30 bg-gradient-to-br from-purple-900/80 to-indigo-900/80">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-8">
              <a href="#" className="text-purple-200 hover:text-cyan-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-purple-200 hover:text-cyan-300 transition-colors">
                Terms of Service
              </a>
            </div>
            <p className="text-purple-200">© 2024 AegisFlood. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default YoloPage
