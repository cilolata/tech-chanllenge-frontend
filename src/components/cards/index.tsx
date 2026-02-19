import { useAccessibilityContext } from '@/contexts/Accessibility'
import type { IPost } from '@/interfaces'
import { Stack, Button, Card } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export const CardLesson = (item: IPost) => {
  const navigate = useNavigate()
  const { setIsLessonPage } = useAccessibilityContext()

  return (
    <Stack gap="4" direction="row" wrap="wrap">
      <Card.Root bg={'white'} width="320px">
        <Card.Body gap="2">
          <Card.Title tabIndex={0} as={'h2'} mb="2">{item.title}</Card.Title>
          <Card.Description tabIndex={0}>{item.description}</Card.Description>
          <Card.Description tabIndex={0}>Autor: {item.teacher}</Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button
            bg={'green.800'}
            _hover={{ bg: 'green.700' }}
            onClick={() => {
              navigate(`/aula/${item.id}`)
              setIsLessonPage(true)
            }}
          >
            Ver mais
          </Button>
        </Card.Footer>
      </Card.Root>
    </Stack>
  )
}
