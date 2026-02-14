import { createContext, useContext, useState } from 'react'

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


  const handleContrastToggle = () => {
    setIsisContrast(!isContrast)
    if (!isContrast) {
      window.document.body.classList.add('manual-contrast')
    } else {
      window.document.body.classList.remove('manual-contrast')
      window.document.querySelector('.navbar')?.classList.remove('manual-contrast')
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
        handleLargeText
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
