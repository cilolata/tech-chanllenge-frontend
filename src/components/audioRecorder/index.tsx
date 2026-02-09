import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { Button, HStack, VStack, Text, Box } from '@chakra-ui/react'
import { useState } from 'react'


export const AudioRecorder = () => {
  const [stopped, setStopped] = useState(false)
  const [started, setStarted] = useState(false)

  const {
    isSupported,
    isListening,
    transcript,
    start,
    stop,
    reset,
  } = useSpeechRecognition('pt-BR')

  if (!isSupported) {
    return <Text>Transcrição não suportada 😢</Text>
  }

  return (
    <VStack
      style={{
        marginTop: '100px',
        width: '100%',
        height: '100%',
      }}
    >
      <HStack>
        <Button
          size={'2xl'}
          variant={started ? 'solid' : 'outline'}
          bg={started ? 'green1' : 'transparent'}
          style={{ marginInline: '16px' }}
          onClick={() => {
            start()
            setStopped(false)
            setStarted(true)
          }}
        >
          🎙️ Start
        </Button>
        <Button
          size={'2xl'}
          variant={stopped ? 'solid' : 'outline'}
          bg={stopped ? 'red.500' : 'transparent'}
          style={{ marginInline: '16px' }}
          onClick={() => {
            stop()
            setStopped(true)
            setStarted(false)
          }}
        >
          🛑 Stop
        </Button>
        <Button
          size={'2xl'}
          variant="outline"
          style={{ marginInline: '16px' }}
          onClick={() => {
            reset()
            setStopped(false)
            setStarted(false)
          }}
        >
          ♻️ Reset
        </Button>
      </HStack>

      <VStack
        pl={'10'}
        w={'full'}
        h={'full'}
        mt={'10'}
        alignItems={'flex-start'}
      >
        {isListening && <Text fontSize="24px" fontWeight={'bold'}>Ouvindo 🧏🏻‍♂️ </Text>}
        {transcript && <Text fontSize="24px" fontWeight={'bold'}>Transcrição 💬: </Text>}
        {transcript && (
          <>
            <Text fontSize="24px">{transcript}</Text>{' '}
          </>
        )}
      </VStack>
    </VStack>
  )
}
