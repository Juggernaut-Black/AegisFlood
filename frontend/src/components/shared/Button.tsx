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
    disabled:opacity-40 disabled:cursor-not-allowed
    relative overflow-hidden select-none
    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
  `
  
  const variants: Record<string, string> = {
    primary: `
      bg-blue-600 text-white
      border border-blue-600
      hover:bg-blue-700 hover:border-blue-700
      active:scale-[0.99]
      shadow-sm
    `,
    secondary: `
      bg-slate-900 text-white
      border border-slate-900
      hover:bg-slate-800 hover:border-slate-800
      active:scale-[0.99]
      shadow-sm
    `,
    outline: `
      bg-white text-slate-900
      border border-slate-200
      hover:bg-slate-50 hover:border-slate-300
      active:scale-[0.99]
    `,
    ghost: `
      bg-transparent text-slate-700
      hover:bg-slate-100 hover:text-slate-900
      active:scale-[0.99]
    `,
    gradient: `
      bg-blue-600 text-white
      border border-blue-600
      hover:bg-blue-700 hover:border-blue-700
      active:scale-[0.99]
      shadow-sm
    `,
    danger: `
      bg-red-600 text-white
      border border-red-600
      hover:bg-red-700 hover:border-red-700
      active:scale-[0.99]
      shadow-sm
    `,
    success: `
      bg-emerald-600 text-white
      border border-emerald-600
      hover:bg-emerald-700 hover:border-emerald-700
      active:scale-[0.99]
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




