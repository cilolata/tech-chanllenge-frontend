import type { IPost } from '@/interfaces'
import { Stack, Button, Card } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export const CardLesson = (item: IPost) => {
  const navigate = useNavigate()

  return (
    <Stack gap="4" direction="row" wrap="wrap">
      <Card.Root width="320px">
        <Card.Body gap="2">
          <Card.Title mb="2">{item.title}</Card.Title>
          <Card.Description>{item.description}</Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button
            bg={'green1'}
            onClick={() => {
              navigate(`/aula/${item.id}`)
            }}
          >
            Ver mais
          </Button>
        </Card.Footer>
      </Card.Root>
    </Stack>
  )
}
