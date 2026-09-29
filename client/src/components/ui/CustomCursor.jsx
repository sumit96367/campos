import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const onEnter = (e) => {
      const el = e.target
      if (el.matches('a, button, [role="button"], label, summary, input, textarea, select')) {
        setIsHovering(true)
      }
    }
    const onLeave = () => setIsHovering(false)

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '10px' : '6px',
          height: isHovering ? '10px' : '6px',
          background: '#B8963E',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          marginLeft: isHovering ? '-5px' : '-3px',
          marginTop: isHovering ? '-5px' : '-3px',
          transition: 'width 0.25s ease, height 0.25s ease, margin 0.25s ease',
          opacity: isVisible ? 1 : 0,
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovering ? '44px' : '32px',
          height: isHovering ? '44px' : '32px',
          border: `1px solid rgba(184, 150, 62, ${isHovering ? 0.8 : 0.4})`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          marginLeft: isHovering ? '-22px' : '-16px',
          marginTop: isHovering ? '-22px' : '-16px',
          transition: 'width 0.35s ease, height 0.35s ease, margin 0.35s ease, border-color 0.35s ease',
          opacity: isVisible ? 1 : 0,
          willChange: 'transform',
          backdropFilter: isHovering ? 'blur(2px)' : 'none',
        }}
      />
    </>
  )
}

export default CustomCursor
