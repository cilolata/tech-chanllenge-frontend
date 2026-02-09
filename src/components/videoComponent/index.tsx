import { useRef, type RefObject } from 'react'
import { useSubtitles } from '@/hooks/useSubtitles'
import { SubtitleOverlay } from '../subtitlesOverlay'
import { HStack, Heading, Stack, Text } from '@chakra-ui/react'

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
          <video ref={videoRef} controls>
            <source src={url} type="video/mp4" />
          </video>
          <SubtitleOverlay text={activeText} progress={progress} />
        </div>
      </Stack>
      <Stack w={'50%'} padding="0 24px" bg={'gray.100'} borderRadius={'4px'}>
        <Heading mt={'16px'} mb={'8px'}>
          Transcrição
        </Heading>
        {transcript?.map((item) => (
          <Stack key={item} lineHeight={'taller'}>
            <Text>{item.transcript}</Text>
          </Stack>
        ))}
      </Stack>
    </HStack>
  )
}
