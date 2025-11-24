import React from 'react'

type TextHoverEffectProps = {
  children: React.ReactNode
  className?: string
}

export function TextHoverEffect({ children, className }: TextHoverEffectProps) {
  return (
    <div className={`text-hover-effect ${className ?? ''}`}>
      {children}
    </div>
  )
}

