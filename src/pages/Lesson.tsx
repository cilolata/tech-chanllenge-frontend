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
  Button,
  HStack,
} from '@chakra-ui/react'
import { FaChalkboardTeacher, FaRegCalendarAlt } from 'react-icons/fa'
import { MdSubject } from 'react-icons/md'
import { dateFormatter } from '@/utils'
import { useParams } from 'react-router'
import useLessons from '@/hooks/useLessons'
import { VideoWithSubtitles } from '@/components/videoComponent'
import { LessonContent } from '@/components/lessonContent'

export const IconWithReactIcon: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Icon size="sm" color="gray3">
    {children}
  </Icon>
)

export const Lesson = () => {
  const [showVideo, setShowVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const { id } = useParams()
  const { post, teacherName, loadingLesson, handleGetLesson } = useLessons()

  useEffect(() => {
    const fetchLesson = () => {
      handleGetLesson(id)
    }
    fetchLesson()
  }, [id])

  return (
    <Stack
      as={'section'}
      marginTop={'64px'}
      paddingX={'24px'}
      paddingY={'16px'}
      w={'100%'}
      height={'100%'}
      bg={{ _highContrast: 'black' }}
      color={{ _highContrast: 'white' }}
    >
      {!showVideo ? (
        <>
          <HStack justifyContent={'space-between'}>
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
            {post?.url && (
              <Button
                bg={'green1'}
                onClick={() => {
                  setShowVideo(!showVideo)
                }}
              >
                Ver video
              </Button>
            )}
          </HStack>
          {loadingLesson && <SkeletonText noOfLines={5} />}
          <LessonContent title={post?.title} content={post?.content} />
        </>
      ) : (
        <VStack gap={'24px'} padding={'16px'} justifyContent={'center'}>
          <HStack w={'full'} justifyContent={'flex-start'}>
            <Button
              variant={'ghost'}
              onClick={() => {
                setShowVideo(!showVideo)
              }}
            >
              Voltar
            </Button>
          </HStack>
          {post?.transcriptTime && post.url && (
            <>
              <VideoWithSubtitles
                url={post.url}
                transcript={post.transcriptTime}
              />
            </>
          )}
        </VStack>
      )}
    </Stack>
  )
}
