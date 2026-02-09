import { useEffect, useRef, useState } from 'react'

export const SubtitleOverlay = ({
  text,
  progress,
}: {
  text: string
  progress: number
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const words = text.split(' ')
  const activeWord = Math.floor(words.length * progress)

  const activeRef = useRef<HTMLSpanElement[]>([])


  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (el.clientHeight > 68) {
      activeRef.current.map((_, i) => {
        if (i < activeWord) {
          activeRef.current.map((we, idx) => {
            if (idx <= i) {
              we.style.display = 'none'
            }
          })
        }
      })
    }
  }, [activeWord])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        maxWidth: '100%',
        bottom: 50,
        left: 5,
        right: 5,
        margin: '20px 0',
        padding: '0 20px',
        width: '100%',
      }}
    >
      {words.map((word, i) => {
        if (i > activeWord) return null
        return (
          <>
          <span
            ref={(el) => {
              if (el) activeRef.current[i] = el as HTMLSpanElement
            }}
            key={i}
            style={{
              display: 'inline-block',
              fontSize: 20,
              lineHeight: '1.5',
              fontFamily: 'Arial, sans-serif',
              color: i <= activeWord ? 'black' : 'transparent',
              backgroundColor: i < activeWord ? '#fff' : 'transparent',
              opacity: i >= activeWord ? 0 : 1,
              transition:
                'opacity 0.20s ease-in-out, backgroundColor 0.20s ease-in-out',
            }}
          >
            <span style={{ padding: '4px' }}>{word}</span>
          </span>
          </>
        )
      })}
    </div>
  )
}
