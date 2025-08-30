import { type ReactNode, useState, useEffect } from 'react'
import {
  Icon,
  Stack,
  Wrap,
  Badge,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useParams } from 'react-router'
import { FaChalkboardTeacher, FaRegCalendarAlt } from 'react-icons/fa'
import { MdSubject } from 'react-icons/md'
import { getLesson } from '@/services'
import type { IPost } from '@/interfaces'

export const IconWithReactIcon: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <Icon size="sm" color="gray3">
    {children}
  </Icon>
)

export const Lesson = () => {
  const { id } = useParams()

  const [post, setPost] = useState<IPost>()

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        const res = await getLesson(id)
        console.log(res)

        setPost(res.post)
      }
      fetch()
    }
  }, [id])

  return (
    <Stack
      as={'section'}
      marginTop={'64px'}
      paddingX={'24px'}
      paddingY={'16px'}
    >
      <Wrap>
        <Badge size="lg">
          <IconWithReactIcon>
            <FaChalkboardTeacher />
          </IconWithReactIcon>
          <Text fontWeight={'bold'}>Professor:</Text>
          <Text>José</Text>
        </Badge>
        <Badge colorPalette="green" size="lg">
          <IconWithReactIcon>
            <MdSubject />
          </IconWithReactIcon>
          <Text fontWeight={'bold'}>Matéria:</Text>
          <Text>{post?.subject}</Text>
        </Badge>
        <Badge colorPalette="purple" size="lg">
          <IconWithReactIcon>
            <FaRegCalendarAlt />
          </IconWithReactIcon>
          <Text fontWeight={'bold'}>Data postagem:</Text>
          <Text>01/01</Text>
        </Badge>
      </Wrap>

      <VStack gap={'24px'} padding={'16px'} justifyContent={'center'}>
        <Heading>{post?.title}</Heading>
        {post?.content && (
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        )}
      </VStack>
    </Stack>
  )
}
