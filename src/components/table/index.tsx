import useLessons from '@/hooks/useLessons'
import { dateFormatter } from '@/utils'
import { Flex, Spinner, Text, Table, VStack, Button } from '@chakra-ui/react'
import { PiTrash } from 'react-icons/pi'
import { TiEdit } from 'react-icons/ti'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '@/contexts/AuthContext'
import { IoDocumentTextOutline } from 'react-icons/io5'

export const TableComponent = () => {
  const navigate = useNavigate()

  const { handleDeleteLesson, loadingDashboard, posts } = useLessons()

  const { sessionData } = authContext()
  const userId = sessionData().userId

  if (
    posts.filter((item) => Number(item.user_id) === Number(userId)).length ===
      0 &&
    !loadingDashboard
  ) {
    return (
      <VStack w={'full'} h={'400px'} align={'center'} justifyContent={'center'}>
        <IoDocumentTextOutline size={'100'} />
        <Text fontSize={'lg'}>Sem aulas criadas</Text>
      </VStack>
    )
  }

  return (
    <Flex
      direction={'column'}
      h={'full'}
      w={'full'}
      align={'center'}
      padding={'32px 64px'}
    >
      {loadingDashboard ? (
        <VStack
          colorPalette="teal"
          h={'400px'}
          w={'full'}
          align={'center'}
          justifyContent={'center'}
        >
          <Spinner size="xl" color="colorPalette.600" />
          <Text color="colorPalette.600">Carregando...</Text>
        </VStack>
      ) : (
        <Table.Root striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Título</Table.ColumnHeader>
              <Table.ColumnHeader>Descriçao</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Data de criação
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">
                Data de edição
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Editar</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Deletar</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {posts?.map((item) => {
              if (Number(item.user_id) === Number(userId)) {
                return (
                  <Table.Row key={item.id}>
                    <Table.Cell color="green1">
                      <Link to={{ pathname: `/aula/${item.id}` }}>
                        {item.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell color="green1">
                      <Link to={{ pathname: `/aula/${item.id}` }}>
                        {item.description}
                      </Link>
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      {dateFormatter(item.created_at)}
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      {dateFormatter(item.updated_at)}
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      <Flex justifyContent={'end'}>
                        <Button
                          size={'lg'}
                          variant={'ghost'}
                          onClick={() => {
                            navigate(`/aula/editar/${item.id}`)
                          }}
                        >
                          <TiEdit color='green' size={48} />
                        </Button>
                      </Flex>
                    </Table.Cell>
                    <Table.Cell textAlign="end">
                      <Flex justifyContent={'end'}>
                        <Button
                          size={'lg'}
                          variant={'ghost'}
                          onClick={async () => {
                            await handleDeleteLesson(item.id)
                          }}
                        >
                          <PiTrash color="b30000" size={48} />
                        </Button>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                )
              }
            })}
          </Table.Body>
        </Table.Root>
      )}
    </Flex>
  )
}
