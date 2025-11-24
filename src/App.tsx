import { useState, useEffect, useMemo } from 'react'
import nadFunLogo from './assets/site assets/nad.fun.png'
import twitterLogo from './assets/site assets/twitter.png'
import letterO from './assets/letters/O.svg'
import { BorderBeam } from './components/ui/border-beam'
import './App.css'

function App() {
  const [displayText, setDisplayText] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const fullText = 'we are going to $MONILLIONS'
  const monillionsStartIndex = 'we are going to $'.length
  const renderTypewriterSegment = (text: string, baseIndex: number, isMonillions: boolean) => {
    return text.split('').map((char, index) => {
      const key = baseIndex + index
      const isO = char.toLowerCase() === 'o' && isMonillions
      const content = char === ' ' ? '\u00A0' : char
      if (isMonillions) {
        if (isO) {
          return (
            <span key={key} className="typewriter-char typewriter-char--monillions">
              <img src={letterO} alt="O" className="typewriter-letter-o" />
            </span>
          )
        }
        return (
          <span key={key} className="typewriter-char typewriter-char--monillions">
            {content}
          </span>
        )
      }
      if (char === ' ') {
        return (
          <span key={key} className="typewriter-char">
            &nbsp;
          </span>
        )
      }
      return (
        <span key={key} className="typewriter-char">
          {content}
        </span>
      )
    })
  }

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
      <div className="content">
        <div className="typewriter-container">
          <h1 className="typewriter-text">
            {renderTypewriterSegment(displayText.slice(0, monillionsStartIndex), 0, false)}
            {displayText.length > monillionsStartIndex && (
              <span className="typewriter-monillions">
                {renderTypewriterSegment(displayText.slice(monillionsStartIndex), monillionsStartIndex, true)}
              </span>
            )}
            <span className="cursor">|</span>
          </h1>
        </div>

        <div className="logos-section">
          <BorderBeam duration={4} delay={0} colorFrom="#765de3" colorTo="#816bfa">
            <a href="https://twitter.com/monillions" target="_blank" rel="noopener noreferrer" className="logo-item">
              <img src={twitterLogo} className="platform-logo" alt="Twitter" />
            </a>
          </BorderBeam>
          <BorderBeam duration={4} delay={1} colorFrom="#765de3" colorTo="#816bfa">
            <a href="https://nad.fun" target="_blank" rel="noopener noreferrer" className="logo-item">
              <img src={nadFunLogo} className="platform-logo" alt="Nad.fun" />
            </a>
          </BorderBeam>
        </div>

        <div className="action-section">
          <BorderBeam duration={3} colorFrom="#765de3" colorTo="#816bfa">
            <button className="tweet-button" onClick={handleTweet}>
              <span className="tweet-text">Share the Vision</span>
              <div className="tweet-glow"></div>
            </button>
          </BorderBeam>
        </div>
      </div>
    </>
  )
}

export default App
