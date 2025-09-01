import { CardLesson } from '@/components/CardLesson'
import { InputSearch } from '@/components/InputSearch'
import type { IPost } from '@/interfaces'
import { getAllLessons } from '@/services/lessons'
import { VStack, Flex, Skeleton } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export const Lessons: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    const fetch = async () => {
      const response = await getAllLessons()
      setPosts(response.posts)
    }
    fetch()
  }, [])

  return (
    <VStack as={'section'} gap={'24px'} padding={'24px'} marginTop={'64px'}>
      <InputSearch />
      <Flex
        wrap={'wrap'}
        gap={'16px'}
        justifyContent={'center'}
        paddingX={'24px'}
      >
        {!posts.length ? (
          <>
            <Skeleton height="200px" width="320px" />
            <Skeleton height="200px" width="320px" />
            <Skeleton height="200px" width="320px" />
          </>
        ) : (
          posts.map((item) => {
            return <CardLesson {...item} />
          })
        )}
      </Flex>
    </VStack>
  )
}
