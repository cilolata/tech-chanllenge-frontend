import { createContext, useContext, useEffect, useState } from 'react'

interface AccessibilityContextData {
  readingMode: boolean
  setReadingMode: React.Dispatch<React.SetStateAction<boolean>>
  isLessonPage: boolean
  setIsLessonPage: React.Dispatch<React.SetStateAction<boolean>>
  showVideo: boolean
  setShowVideo: React.Dispatch<React.SetStateAction<boolean>>
  handleContrastToggle: () => void
  isContrast: boolean
  handleSmallText: () => void
  handleMediumText: () => void
  handleLargeText: () => void
  handleVoiceOver: () => void
}

const AccessibilityContext = createContext<AccessibilityContextData>(
  {} as AccessibilityContextData
)

export const AccessibilityProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [readingMode, setReadingMode] = useState(false)
  const [isLessonPage, setIsLessonPage] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [isContrast, setIsisContrast] = useState(false)
  const [voiceOver, setVoiceOver] = useState(false)

  const handleContrastToggle = () => {
    setIsisContrast(!isContrast)
    if (!isContrast) {
      window.document.body.classList.add('manual-contrast')
    } else {
      window.document.body.classList.remove('manual-contrast')
      window.document
        .querySelector('.navbar')
        ?.classList.remove('manual-contrast')
    }
  }

  const handleSmallText = () => {
    const html = window.document.querySelector('html')
    html?.classList.remove('medium-text')
    html?.classList.remove('large-text')
    html?.classList.add('small-text')
  }

  const handleMediumText = () => {
    const html = window.document.querySelector('html')
    html?.classList.remove('large-text')
    html?.classList.remove('small-text')
    html?.classList.add('medium-text')
  }

  const handleLargeText = () => {
    const html = window.document.querySelector('html')
    html?.classList.remove('medium-text')
    html?.classList.remove('small-text')
    html?.classList.add('large-text')
  }

  const speakText = (text: string | undefined) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    window.speechSynthesis.speak(utterance)
  }

  const handleVoiceOver = () => {
    setVoiceOver(!voiceOver)
  }

  useEffect(() => {
    if (voiceOver) {
      window.document.addEventListener('focusin', (event) => {
        const target = event.target as HTMLElement
        console.log(target)
        if(target && target.tagName === 'VIDEO') {
          const ariaLabel = target.getAttribute('aria-label') || ''
          speakText(ariaLabel)
        }
        if (target && target.tagName === 'INPUT') {
          const placeholder = target.getAttribute('placeholder') || target.getAttribute('aria-label') || '' 
          speakText(placeholder)
        }
        if (target && target.innerText) {
          speakText(target.innerText)
        }
      })
    }
  }, [voiceOver])

  return (
    <AccessibilityContext.Provider
      value={{
        readingMode,
        setReadingMode,
        isLessonPage,
        setIsLessonPage,
        showVideo,
        setShowVideo,
        handleContrastToggle,
        isContrast,
        handleSmallText,
        handleMediumText,
        handleLargeText,
        handleVoiceOver,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibilityContext = () => {
  const context = useContext(AccessibilityContext)
  return context
}
