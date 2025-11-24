import React from 'react'
import './border-beam.css'

interface BorderBeamProps {
  className?: string
  children: React.ReactNode
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
}

export function BorderBeam({ 
  className = '', 
  children, 
  duration = 3,
  delay = 0,
  colorFrom = '#765de3',
  colorTo = '#816bfa'
}: BorderBeamProps) {
  return (
    <div className={`border-beam-container ${className}`}>
      <div 
        className="border-beam-wrapper"
        style={{
          '--duration': `${duration}s`,
          '--delay': `${delay}s`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
        } as React.CSSProperties}
      >
        <div className="border-beam"></div>
        {children}
      </div>
    </div>
  )
}

