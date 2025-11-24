import React, { useState, useRef } from 'react'

interface Ripple {
  id: number
  x: number
  y: number
  timestamp: number
}

export function BackgroundRippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const rippleIdRef = useRef(0)
  const lastRippleTime = useRef(0)

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    // Throttle ripples to avoid too many
    const now = Date.now()
    if (now - lastRippleTime.current < 100) return
    lastRippleTime.current = now

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple: Ripple = {
      id: rippleIdRef.current++,
      x,
      y,
      timestamp: now,
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 1000)
  }

  // Generate grid of boxes - more boxes for better coverage
  const boxes = Array.from({ length: 50 }, (_, i) => i)

  return (
    <div
      ref={containerRef}
      className="background-ripple-container"
      onMouseMove={createRipple}
    >
      {boxes.map((box) => (
        <div key={box} className="ripple-box" />
      ))}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </div>
  )
}

