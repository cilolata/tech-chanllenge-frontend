import { type ReactNode, useEffect, useState, use, useRef } from 'react'
import {
  Icon,
  Stack,
  Wrap,
  Badge,
  VStack,
  Heading,
  Text,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react'
import { FaChalkboardTeacher, FaRegCalendarAlt } from 'react-icons/fa'
import { MdSubject } from 'react-icons/md'
import { dateFormatter } from '@/utils'
import { useParams } from 'react-router'
import useLessons from '@/hooks/useLessons'

export const IconWithReactIcon: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Icon size="sm" color="gray3">
    {children}
  </Icon>
)

export const Lesson = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const textRef = useRef<HTMLDivElement | null>(null)

  const [transcriptTime, setTranscriptTime] = useState<string>()
  const { id } = useParams()
  const { post, teacherName, loadingLesson, handleGetLesson } = useLessons()


  useEffect(() => {
    const fetchLesson = () => {
      handleGetLesson(id)
    }
    fetchLesson()
  }, [id])

  useEffect(() => {
    if (textRef.current && videoRef.current) {
      if (videoRef.current.played.length === 0) return
      const range = document.createRange()
      range.selectNodeContents(textRef.current)

      if (textRef.current) textRef.current.click()
      textRef.current.style.transition = 'background-color 0.5s ease'
      textRef.current.style.backgroundColor = 'yellow'
    }
  }, [transcriptTime])

  useEffect(() => {
    const video = videoRef.current
    if (video === null) return

    video.playbackRate = 0.9
    const updateTime = () => {
      setTranscriptTime('')
      const postNewTranscription = post?.newTranscription.flat()
      const arrReorder = postNewTranscription.map((item) => {
        const transcript = item.alternatives.map((alt) => alt)[0].transcript
        const time =
          typeof item.resultEndTime === 'string'
            ? item.resultEndTime.split('s')[0]
            : `${item.resultEndTime}`.split('s')[0]
        return {
          transcript,
          resultEndTime: (+time * 1000).toFixed(2),
        }
      })

      const currentTime = video.currentTime
      setTranscriptTime(
        arrReorder.find((item) => +item.resultEndTime >= currentTime * 1000)
          .transcript
      ) 
    }

    video.ontimeupdate = (ev) => {
      if (ev.target === null) return
      updateTime()
    }

    video.onplay = () => {
      const buttonSpeed = document.querySelector(
        '.vpw-button-speed'
      ) as HTMLElement
      if (buttonSpeed.textContent === '1x') {
        buttonSpeed.click()
        buttonSpeed.click()
      }
    }

    return () => {
      setTranscriptTime('')
      video.ontimeupdate
    }
  }, [videoRef.current])

  return (
    <Stack
      as={'section'}
      marginTop={'64px'}
      paddingX={'24px'}
      paddingY={'16px'}
      height={'100%'}
    >
      <Wrap>
        <Skeleton asChild loading={loadingLesson}>
          <Badge size="lg">
            <IconWithReactIcon>
              <FaChalkboardTeacher />
            </IconWithReactIcon>
            {teacherName && (
              <>
                <Text fontWeight={'bold'}>Professor:</Text>
                <Text>{teacherName}</Text>
              </>
            )}
          </Badge>
        </Skeleton>
        <Skeleton asChild loading={loadingLesson}>
          <Badge colorPalette="green" size="lg">
            <IconWithReactIcon>
              <MdSubject />
            </IconWithReactIcon>
            {post?.subject && (
              <>
                <Text fontWeight={'bold'}>Matéria:</Text>
                <Text>{post.subject}</Text>
              </>
            )}
          </Badge>
        </Skeleton>
        <Skeleton asChild loading={!post}>
          <Badge colorPalette="purple" size="lg">
            <IconWithReactIcon>
              <FaRegCalendarAlt />
            </IconWithReactIcon>
            {post?.created_at && (
              <>
                <Text fontWeight={'bold'}>Data postagem:</Text>
                <Text>{dateFormatter(post.created_at)}</Text>
              </>
            )}
          </Badge>
        </Skeleton>
      </Wrap>
      {loadingLesson && <SkeletonText noOfLines={5} />}
      <VStack gap={'24px'} padding={'16px'} justifyContent={'center'}>
        <Heading>{post?.title}</Heading>
        {post?.content && (
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        )}
      </VStack>
      <VStack gap={'24px'} padding={'16px'} justifyContent={'center'}>
        {post?.url && (
          <video style={{
          }} height={400} width={'60%'} controls ref={videoRef}>
            <source src={post.url} type="video/mp4" />
          </video>
        )}
        <div ref={textRef}>{transcriptTime}</div>
      </VStack>
    </Stack>
  )
}
