import { useState, useEffect, useMemo } from 'react'
import monillionsLogo from './assets/site assets/monillions logo.png'
import nadFunLogo from './assets/site assets/nad.fun.png'
import twitterLogo from './assets/site assets/twitter.png'
import './App.css'

function App() {
  const [displayText, setDisplayText] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const fullText = 'we are going to $monillions'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleTweet = () => {
    const tweetText = encodeURIComponent("we are going to $monillions")
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`
    window.open(tweetUrl, '_blank')
  }

  // Generate more particles for independent floating animation
  const particles = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 8,
    x: Math.random() * 100,
    y: Math.random() * 100,
  })), [])

  return (
    <>
      <div className="background-aura"></div>
      <div className="conic-background"></div>
      <div 
        className="tech-grid" 
        style={{ 
          '--mouse-x': `${mousePos.x}px`,
          '--mouse-y': `${mousePos.y}px`
        } as React.CSSProperties}
      ></div>
      <div className="floating-particles">
        {particles.map((particle) => (
          <div key={particle.id} className="particle" style={{
            '--delay': `${particle.delay}s`,
            '--duration': `${particle.duration}s`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          } as React.CSSProperties}></div>
        ))}
      </div>
      <div className="logo-header">
        <img src={monillionsLogo} className="main-logo" alt="Monillions Logo" />
      </div>
      <div className="content">
        <div className="typewriter-container">
          <h1 className="typewriter-text">{displayText}<span className="cursor">|</span></h1>
        </div>

        <div className="logos-section">
          <a href="https://twitter.com/monillions" target="_blank" rel="noopener noreferrer" className="logo-item">
            <img src={twitterLogo} className="platform-logo" alt="Twitter" />
          </a>
          <a href="https://nad.fun" target="_blank" rel="noopener noreferrer" className="logo-item">
            <img src={nadFunLogo} className="platform-logo" alt="Nad.fun" />
          </a>
        </div>

        <div className="action-section">
          <button className="tweet-button" onClick={handleTweet}>
            <span className="tweet-text">Share the Vision</span>
            <div className="tweet-glow"></div>
          </button>
        </div>
      </div>
    </>
  )
}

export default App
