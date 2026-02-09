interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
  
    start(): void
    stop(): void
    abort(): void
  
    onstart: (() => void) | null
    onend: (() => void) | null
    onerror: ((event: any) => void) | null
    onresult: ((event: SpeechRecognitionEvent) => void) | null
  }
  
  interface SpeechRecognitionEvent extends Event {
    resultIndex: any
    results: SpeechRecognitionResultList
  }
  
  interface Window {
    SpeechRecognition?: {
      new (): SpeechRecognition
    }
    webkitSpeechRecognition?: {
      new (): SpeechRecognition
    }
  }