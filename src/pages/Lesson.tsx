import { type ReactNode, useEffect } from 'react'
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
import { useAccessibilityContext } from '@/contexts/Accessibility'

export const IconWithReactIcon: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Icon size="sm" color="gray3">
    {children}
  </Icon>
)

export const Lesson = () => {
  const { id } = useParams()
  const { post, teacherName, loadingLesson, handleGetLesson } = useLessons()
  const { readingMode, setReadingMode, showVideo, setShowVideo, isContrast } =
    useAccessibilityContext()

  useEffect(() => {
    const fetchLesson = () => {
      handleGetLesson(id)
    }
    fetchLesson()
  }, [id])

  if (readingMode && !showVideo) {
    return (
      <Stack
        as={'section'}
        marginTop={'64px'}
        paddingX={'24px'}
        paddingY={'16px'}
        w={'100%'}
        height={'100%'}
      >
        <HStack w={'full'} justifyContent={'flex-end'}>
          <Button onClick={() => setReadingMode(false)}>
            Sair do modo leitura
          </Button>
        </HStack>
        <VStack gap={'24px'} padding={'16px'} justifyContent={'center'}>
          <Heading tabIndex={0}>{post?.title}</Heading>
          {post?.content && (
            <div
              tabIndex={0}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </VStack>
      </Stack>
    )
  }

  return (
    <Stack
      as={'section'}
      marginTop={'64px'}
      paddingX={'24px'}
      paddingY={'16px'}
      w={'100%'}
      height={'100%'}
    >
      <>
        {!showVideo ? (
          <>
            <HStack justifyContent={'space-between'}>
              <Wrap>
                <Skeleton asChild loading={loadingLesson}>
                  <Badge colorPalette={isContrast ? 'pink' : 'gray'} size="lg">
                    <IconWithReactIcon>
                      <FaChalkboardTeacher />
                    </IconWithReactIcon>
                    {teacherName && (
                      <>
                        <Text tabIndex={0} fontWeight={'bold'}>
                          Professor:
                        </Text>
                        <Text tabIndex={0}>{teacherName}</Text>
                      </>
                    )}
                  </Badge>
                </Skeleton>
                <Skeleton asChild loading={loadingLesson}>
                  <Badge colorPalette={isContrast ? 'pink' : 'green'} size="lg">
                    <IconWithReactIcon>
                      <MdSubject />
                    </IconWithReactIcon>
                    {post?.subject && (
                      <>
                        <Text tabIndex={0} fontWeight={'bold'}>
                          Matéria:
                        </Text>
                        <Text tabIndex={0}>{post.subject}</Text>
                      </>
                    )}
                  </Badge>
                </Skeleton>
                <Skeleton asChild loading={!post}>
                  <Badge
                    colorPalette={isContrast ? 'pink' : 'purple'}
                    size="lg"
                  >
                    <IconWithReactIcon>
                      <FaRegCalendarAlt />
                    </IconWithReactIcon>
                    {post?.created_at && (
                      <>
                        <Text tabIndex={0} fontWeight={'bold'}>
                          Data postagem:
                        </Text>
                        <Text tabIndex={0}>
                          {dateFormatter(post.created_at)}
                        </Text>
                      </>
                    )}
                  </Badge>
                </Skeleton>
              </Wrap>
              {post?.url && (
                <Button
                  bg={isContrast ? 'white' : 'green.800'}
                  color={isContrast ? 'black' : 'white'}
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
          <Stack gap={'24px'}>
            <HStack w={'full'} justifyContent={'space-between'}>
              <Text
                tabIndex={0}
                as={'h1'}
                fontSize={'lg'}
                fontWeight={'bold'}
                padding={'8px 64px'}
              >
                Vídeo da aula
              </Text>
              <Button
                bg={'white'}
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
          </Stack>
        )}
      </>
    </Stack>
  )
}
