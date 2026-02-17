import { ReactNode, forwardRef } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'gradient'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  className = '', 
  type = 'button',
  fullWidth = false
}, ref) => {
  const base = `
    inline-flex items-center justify-center font-medium 
    transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1)
    focus-ring disabled:opacity-40 disabled:cursor-not-allowed 
    relative overflow-hidden select-none
    hover-lift
  `
  
  const variants: Record<string, string> = {
    primary: `
      bg-gradient-to-r from-purple-800 to-indigo-800 text-white 
      border border-cyan-400/30
      hover:from-purple-700 hover:to-indigo-700 hover:border-cyan-400/50
      active:from-purple-900 active:to-indigo-900 active:scale-[0.98]
      shadow-lg hover:shadow-xl backdrop-blur-sm
    `,
    secondary: `
      bg-purple-900/50 text-purple-100 
      border border-purple-600/30
      hover:bg-purple-800/60 hover:text-white hover:border-purple-500/40
      active:bg-purple-700/70 active:scale-[0.98]
      shadow-md backdrop-blur-sm
    `,
    outline: `
      bg-transparent text-white 
      border border-cyan-400/50
      hover:bg-purple-800/30 hover:border-cyan-400
      active:bg-purple-700/40 active:scale-[0.98]
      backdrop-blur-sm
    `,
    ghost: `
      bg-transparent text-purple-200 
      hover:bg-purple-800/30 hover:text-white
      active:bg-purple-700/40 active:scale-[0.98]
    `,
    gradient: `
      bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0
      hover:from-cyan-600 hover:to-purple-700 hover:shadow-lg
      active:scale-[0.98]
      shadow-md
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-pink-600 text-white border-0
      hover:from-red-600 hover:to-pink-700 hover:shadow-md
      active:scale-[0.98]
      shadow-sm
    `,
    success: `
      bg-gradient-to-r from-emerald-500 to-cyan-600 text-white border-0
      hover:from-emerald-600 hover:to-cyan-700 hover:shadow-md
      active:scale-[0.98]
      shadow-sm
    `
  }

  const sizes: Record<string, string> = {
    xs: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    sm: 'px-4 py-2 text-sm rounded-xl gap-2',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
    xl: 'px-8 py-4 text-lg rounded-xl gap-3'
  }

  const widthClass = fullWidth ? 'w-full' : ''
  const isDisabled = disabled || loading

  return (
    <button 
      ref={ref}
      type={type} 
      onClick={onClick} 
      disabled={isDisabled} 
      className={`${base} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className="animate-spin h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  )
})

Button.displayName = 'Button'

export default Button




