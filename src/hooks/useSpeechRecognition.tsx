import { useEffect, useRef, useState } from 'react'

export function useSpeechRecognition(lang = 'pt-BR') {
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setIsSupported(false)
      return
    }

    setIsSupported(true)

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.lang = lang
    recognition.continuous = true
    recognition.interimResults = true

    recognitionRef.current.onstart = () => {
      setIsListening(true)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current.onerror = (e) => {
      console.error('SpeechRecognition error', e)
    }

    recognitionRef.current.onresult = (event) => {
      setLoading(true)
      let finalText = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const last = event.results[event.results.length - 1]
        const text = last[0].transcript
        finalText += text + ' '
        setTranscript((prev) => prev + ' ' + finalText)
        setLoading(false)
      }
    }

    return () => recognition.abort()
  }, [lang])

  const start = () => {
    recognitionRef.current?.start()
  }
  const stop = () => {
    recognitionRef.current?.stop()
  }

  const reset = () => {
    setTranscript('')
    setInterimTranscript('')
  }

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    start,
    stop,
    reset,
    loading
  }
}
