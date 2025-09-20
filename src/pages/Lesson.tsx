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
  const { id } = useParams()
  const { post, teacherName, loadingLesson, handleGetLesson } = useLessons()


  useEffect(() => {
    const fetch = () => {
      handleGetLesson(id)
    }
    fetch()
  }, [id])

  return (
    <Stack
      as={'section'}
      marginTop={'64px'}
      paddingX={'24px'}
      paddingY={'16px'}
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
    </Stack>
  )
}
