import { CardLesson } from '@/components/CardLesson'
import { InputSearch } from '@/components/InputSearch'
import useLessons from '@/hooks/useLessons'
import { VStack, Flex, Skeleton, Text, Stack } from '@chakra-ui/react'
import { IoDocumentTextOutline } from 'react-icons/io5'

export const Lessons: React.FC = () => {
  const { loadingAllLessons, posts, handleSearchLesson } = useLessons()

  const handleSearch = async (search?: string) => {
     await handleSearchLesson(search)
  }

  return (
    <Stack>
      <Text as={'h1'} fontSize={'lg'} fontWeight={'bold'} padding={'24px'} marginTop={'64px'}>
        Painel de aulas
      </Text>
      <InputSearch onChange={e => handleSearch(e.target.value)} />
      <VStack as={'section'} gap={'24px'} padding={'24px'}>
        {posts?.length === 0 && !loadingAllLessons ? (
          <>
            <IoDocumentTextOutline size={'100'} />
            <Text fontSize={'lg'}>Sem aulas</Text>
          </>
        ) : (
          <>
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
                posts?.map((item) => {
                  return <CardLesson {...item} />
                })
              )}
            </Flex>
          </>
        )}
      </VStack>
    </Stack>
  )
}
