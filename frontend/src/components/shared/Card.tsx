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
      bg-white
      border border-slate-200
      shadow-sm
    `,
    elevated: `
      bg-white
      border border-slate-200
      shadow-md
    `,
    outlined: `
      bg-white
      border-2 border-slate-200
      shadow-none
    `,
    glass: `
      bg-white/70 border border-slate-200/70
      backdrop-filter blur-12px
      shadow-sm
    `,
    gradient: `
      bg-gradient-to-br from-slate-50 to-white
      border border-slate-200
      shadow-sm
    `,
    surface: `
      bg-slate-50
      border border-slate-200
      shadow-sm
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
    hover:shadow-md hover:-translate-y-0.5
    hover:border-slate-300
    cursor-pointer
  ` : ''

  const interactiveEffect = interactive ? `
    hover:border-slate-300
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




