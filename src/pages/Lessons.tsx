import { CardLesson } from '@/components/CardLesson'
import { InputSearch } from '@/components/InputSearch'
import useLessons from '@/hooks/useLessons'
import { VStack, Flex, Skeleton } from '@chakra-ui/react'

export const Lessons: React.FC = () => {
  const { loadingAllLessons, posts } = useLessons()

  return (
    <VStack as={'section'} gap={'24px'} padding={'24px'} marginTop={'64px'}>
      <InputSearch />
      <Flex
        wrap={'wrap'}
        gap={'16px'}
        justifyContent={'center'}
        paddingX={'24px'}
      >
        {loadingAllLessons ? (
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
