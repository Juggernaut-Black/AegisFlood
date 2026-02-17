import { ReactNode, forwardRef } from 'react'

type CardProps = {
  children: ReactNode
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient' | 'surface'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  interactive?: boolean
  className?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ 
  children, 
  variant = 'default',
  padding = 'md',
  hover = false,
  interactive = false,
  className = ''
}, ref) => {
  const base = `
    rounded-2xl transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
    relative overflow-hidden
  `
  
  const variants: Record<string, string> = {
    default: `
      bg-gradient-to-br from-purple-900/40 to-indigo-900/40
      border border-cyan-400/30
      shadow-lg backdrop-blur-sm
    `,
    elevated: `
      bg-gradient-to-br from-purple-800/50 to-indigo-800/50
      border border-cyan-400/40
      shadow-xl backdrop-blur-md
    `,
    outlined: `
      bg-purple-900/20
      border-2 border-cyan-400/50
      shadow-md backdrop-blur-sm
    `,
    glass: `
      bg-purple-900/30 border border-cyan-400/30
      backdrop-filter blur-12px
      shadow-lg
    `,
    gradient: `
      bg-gradient-to-br from-purple-800/60 to-indigo-800/60
      border border-cyan-400/40
      shadow-xl backdrop-blur-md
    `,
    surface: `
      bg-gradient-to-br from-purple-700/50 to-indigo-700/50
      border border-cyan-400/50
      shadow-2xl backdrop-blur-md
    `
  }

  const paddings: Record<string, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }

  const hoverEffect = hover ? `
    hover:shadow-2xl hover:-translate-y-1 
    hover:border-cyan-400/60 hover:from-purple-700/60 hover:to-indigo-700/60
    cursor-pointer
  ` : ''

  const interactiveEffect = interactive ? `
    hover:from-purple-800/60 hover:to-indigo-800/60
    active:scale-[0.99]
    cursor-pointer
  ` : ''

  return (
    <div 
      ref={ref}
      className={`
        ${base} 
        ${variants[variant]} 
        ${paddings[padding]} 
        ${hoverEffect} 
        ${interactiveEffect}
        ${className}
      `}
    >
      {/* Subtle noise texture overlay for Huly-style sophistication */}
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
})

Card.displayName = 'Card'

export default Card




