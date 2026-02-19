import { useRef, type RefObject } from 'react'
import { useSubtitles } from '@/hooks/useSubtitles'
import { SubtitleOverlay } from '../subtitlesOverlay'
import { Button, HStack, Heading, Stack, Text } from '@chakra-ui/react'

export const VideoWithSubtitles = ({
  transcript,
  url,
}: {
  transcript: any[]
  url: string
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const { activeText, progress } = useSubtitles(
    videoRef as RefObject<HTMLVideoElement>,
    transcript
  )

  return (
    <Stack as={'section'} w={'100%'} height={'100%'} mb={'24px'}>
      <HStack
        margin={'0 24px'}
        w="full"
        h={'full'}
        justifyContent={'space-around'}
        gap={'24px'}
        alignItems={'flex-start'}
      >
        <Stack w={'50%'}>
          <div
            style={{
              position: 'relative',
            }}
          >
            <video aria-label="vídeo da aula" ref={videoRef} controls>
              <source src={url} type="video/mp4" />
            </video>
            <Button
              mt={2}
              variant={'solid'}
              bg={'green.700'}
              aria-label="Reproduzir vídeo"
              onClick={() => videoRef.current?.play()}
            >
              Play
            </Button>
            <Button
              mt={2}
              ml={2}
              variant={'solid'}
              bg={'red.600'}
              aria-label="Reproduzir vídeo"
              onClick={() => videoRef.current?.pause()}
            >
              Stop
            </Button>
            <SubtitleOverlay text={activeText} progress={progress} />
          </div>
        </Stack>
        <Stack w={'50%'} padding="0 24px" borderRadius={'4px'}>
          <Heading tabIndex={0} mt={'16px'} mb={'8px'}>
            Transcrição
          </Heading>
          {transcript?.map((item) => (
            <Stack key={item} lineHeight={'taller'}>
              <Text tabIndex={0}>{item.transcript}</Text>
            </Stack>
          ))}
        </Stack>
      </HStack>
    </Stack>
  )
}
