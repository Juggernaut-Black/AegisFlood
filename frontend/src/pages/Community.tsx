import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/shared/Card'
import Button from '../components/shared/Button'
import { useAuth } from '../context/AuthContext'

type CommunityPost = {
  id: number
  user: string
  avatar: string
  timestamp: string
  type: 'image' | 'sos' | 'location' | 'text'
  content: string
  image?: string
  location?: { lat: number, lng: number, address: string }
  sosLevel?: 'low' | 'medium' | 'high' | 'critical'
  likes: number
  comments: number
  verified: boolean
}

type UserActivity = {
  postsToday: number
  sosToday: number
  lastPost: Date
  lastSOS: Date
  reputation: number
}

type AlertType = 'info' | 'warning' | 'emergency' | 'update'

export default function Community() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { token, role } = useAuth()
  const userLabel = token ? (role === 'authority' ? 'Authority' : 'Citizen') : 'Guest'
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 1,
      user: 'Rajesh Kumar',
      avatar: 'RK',
      timestamp: '2 min ago',
      type: 'sos',
      content: 'Urgent help needed! Water level rising rapidly in our area. Need immediate evacuation assistance.',
      location: { lat: 26.1445, lng: 91.7362, address: 'Guwahati, Assam' },
      sosLevel: 'critical',
      likes: 45,
      comments: 12,
      verified: true
    },
    {
      id: 2,
      user: 'Priya Sharma',
      avatar: 'PS',
      timestamp: '15 min ago',
      type: 'image',
      content: 'Current situation at Brahmaputra riverbank. Water level has increased significantly since morning.',
      image: '/api/placeholder/400/300',
      location: { lat: 26.1445, lng: 91.7362, address: 'Guwahati, Assam' },
      likes: 23,
      comments: 8,
      verified: true
    },
    {
      id: 3,
      user: 'Amit Das',
      avatar: 'AD',
      timestamp: '1 hour ago',
      type: 'location',
      content: 'Safe zone established here. Can accommodate 50+ people. Food and water available.',
      location: { lat: 26.1445, lng: 91.7362, address: 'Relief Camp, Guwahati' },
      likes: 67,
      comments: 15,
      verified: true
    }
  ])

  const [newPost, setNewPost] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [showSOSDialog, setShowSOSDialog] = useState(false)
  const [sosLevel, setSOSLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('medium')
  const [userLocation, setUserLocation] = useState<string>('')
  const [alertType, setAlertType] = useState<AlertType>('info')
  const [sosLoading, setSosLoading] = useState(false)
  
  // Anti-spam tracking
  const [userActivity] = useState<UserActivity>({
    postsToday: 2,
    sosToday: 0,
    lastPost: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    lastSOS: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    reputation: 85
  })

  const canPost = () => {
    const now = new Date()
    const timeSinceLastPost = now.getTime() - userActivity.lastPost.getTime()
    const minInterval = 5 * 60 * 1000 // 5 minutes
    
    if (userActivity.postsToday >= 10) {
      return { allowed: false, reason: 'Daily post limit reached (10 posts)' }
    }
    
    if (timeSinceLastPost < minInterval) {
      return { allowed: false, reason: `Please wait ${Math.ceil((minInterval - timeSinceLastPost) / 60000)} minutes before posting again` }
    }
    
    return { allowed: true, reason: '' }
  }

  const canSendSOS = () => {
    const now = new Date()
    const timeSinceLastSOS = now.getTime() - userActivity.lastSOS.getTime()
    const minInterval = 30 * 60 * 1000 // 30 minutes for SOS
    
    if (userActivity.sosToday >= 3) {
      return { allowed: false, reason: 'Daily SOS limit reached (3 SOS calls)' }
    }
    
    if (timeSinceLastSOS < minInterval) {
      return { allowed: false, reason: `Please wait ${Math.ceil((minInterval - timeSinceLastSOS) / 60000)} minutes before sending another SOS` }
    }
    
    return { allowed: true, reason: '' }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size must be less than 5MB')
        return
      }
      setSelectedImage(file)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
        },
        (error) => {
          console.error('Error getting location:', error)
          setUserLocation('Location unavailable')
        }
      )
    } else {
      setUserLocation('Geolocation not supported')
    }
  }

  const handlePost = () => {
    const postCheck = canPost()
    if (!postCheck.allowed) {
      alert(postCheck.reason)
      return
    }

    if (!newPost.trim() && !selectedImage) {
      alert('Please add some content or an image')
      return
    }

    const post: CommunityPost = {
      id: posts.length + 1,
      user: 'Current User',
      avatar: 'CU',
      timestamp: 'now',
      type: selectedImage ? 'image' : 'text',
      content: newPost,
      image: selectedImage ? URL.createObjectURL(selectedImage) : undefined,
      location: userLocation ? { lat: 0, lng: 0, address: userLocation } : undefined,
      likes: 0,
      comments: 0,
      verified: false
    }

    setPosts([post, ...posts])
    setNewPost('')
    setSelectedImage(null)
    setUserLocation('')
  }

  const handleSOSAlert = async () => {
    setSosLoading(true)
    const sosCheck = canSendSOS()
    if (!sosCheck.allowed) {
      alert(sosCheck.reason)
      setSosLoading(false)
      return
    }

    getCurrentLocation()
    
    const sosPost: CommunityPost = {
      id: posts.length + 1,
      user: 'Current User',
      avatar: 'CU',
      timestamp: 'now',
      type: 'sos',
      content: `🚨 SOS ALERT - ${sosLevel.toUpperCase()} PRIORITY 🚨\n\nImmediate assistance required at this location. Please send help!`,
      location: userLocation ? { lat: 0, lng: 0, address: userLocation } : undefined,
      sosLevel,
      likes: 0,
      comments: 0,
      verified: false
    }

    setPosts([sosPost, ...posts])
    setSosLoading(false)
    
    // Show confirmation
    alert('SOS alert sent successfully! Emergency services and nearby community members have been notified.')
  }


  const getSOSColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-yellow-500'
      case 'medium': return 'bg-orange-500'
      case 'high': return 'bg-red-500'
      case 'critical': return 'bg-red-600'
      default: return 'bg-gray-500'
    }
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'sos': return '🚨'
      case 'image': return '📷'
      case 'location': return '📍'
      default: return '💬'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      {/* Header */}
      <div className="bg-purple-900/30 border-b border-cyan-400/30 p-4 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-purple-800/50 rounded-lg transition-colors backdrop-blur-sm"
            >
              <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Community Alerts</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-purple-200">
              {userLabel}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Create Post */}
        <div className="lg:col-span-1">
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Share an Update</h2>
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  What's happening in your area?
                </label>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full p-3 bg-purple-800/40 border border-cyan-400/30 rounded-lg text-white placeholder-purple-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 resize-none backdrop-blur-sm"
                  rows={4}
                  placeholder="Share flood updates, safety tips, or community news..."
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  className="w-full p-3 bg-purple-800/40 border border-cyan-400/30 rounded-lg text-white placeholder-purple-300 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 backdrop-blur-sm"
                  placeholder="Enter your location"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Alert Type
                </label>
                <select
                  value={alertType}
                  onChange={(e) => setAlertType(e.target.value as AlertType)}
                  className="w-full p-3 bg-purple-800/40 border border-cyan-400/30 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 backdrop-blur-sm"
                >
                  <option value="info">Information</option>
                  <option value="warning">Warning</option>
                  <option value="emergency">Emergency</option>
                  <option value="update">Update</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="primary"
                  onClick={handlePost}
                  disabled={!newPost.trim()}
                >
                  Post Update
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleSOSAlert}
                  disabled={sosLoading}
                  loading={sosLoading}
                >
                  {sosLoading ? 'Sending...' : 'Emergency SOS'}
                </Button>
              </div>
            </div>
          </Card>
          
          {/* SOS Alert Card */}
          <Card className="p-6 border-red-400/50 bg-gradient-to-br from-red-900/50 to-pink-900/50">
            <h3 className="text-lg font-semibold text-red-300 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Emergency SOS
            </h3>
            <p className="text-red-200 text-sm mb-4">
              Send an immediate emergency alert to all community members and authorities.
            </p>
            <Button
              variant="danger"
              fullWidth
              onClick={handleSOSAlert}
              disabled={sosLoading}
              loading={sosLoading}
            >
              {sosLoading ? 'Sending SOS...' : 'Send Emergency Alert'}
            </Button>
          </Card>
        </div>

        {/* Middle Column - Posts */}
        <div className="lg:col-span-2">
          {posts.map((post) => (
            <Card key={post.id} className="p-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{post.avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-white">{post.user}</span>
                        {post.verified && <span className="text-cyan-300">✓</span>}
                        <span className="text-lg">{getPostTypeIcon(post.type)}</span>
                        {post.sosLevel && (
                          <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getSOSColor(post.sosLevel)}`}>
                            {post.sosLevel.toUpperCase()} SOS
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-purple-300">{post.timestamp}</span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="space-y-3">
                  <p className="whitespace-pre-wrap text-white">{post.content}</p>
                  
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="w-full max-h-96 object-cover rounded-lg"
                    />
                  )}

                  {post.location && (
                    <div className="flex items-center space-x-2 p-3 rounded-lg bg-purple-800/30">
                      <span className="text-lg">📍</span>
                      <span className="text-sm">{post.location.address}</span>
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-cyan-400/30">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-sm hover:text-cyan-300 transition-colors">
                      <span>👍</span>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm hover:text-cyan-300 transition-colors">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm hover:text-cyan-300 transition-colors">
                      <span>📤</span>
                      <span>Share</span>
                    </button>
                  </div>
                  
                  {post.type === 'sos' && (
                    <Button variant="primary" size="sm">
                      🚑 Respond to SOS
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      </div>
    </div>
  )
}
