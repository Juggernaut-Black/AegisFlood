import { ChangeEvent } from 'react'

type InputProps = {
  type?: string
  placeholder?: string
  value?: string | number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function Input({ type = 'text', placeholder, value, onChange, className = '' }: InputProps) {
  const base = 'w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
  return (
    <input type={type} placeholder={placeholder} value={value as any} onChange={onChange} className={`${base} ${className}`} />
  )
}




