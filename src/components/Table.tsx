import useLessons from '@/hooks/useLessons'
import { dateFormatter } from '@/utils'
import { Flex, Spinner, Text, Table, VStack } from '@chakra-ui/react'
import { PiTrash } from 'react-icons/pi'
import { TiEdit } from 'react-icons/ti'
import { IoDocumentTextOutline } from 'react-icons/io5'

export const TableComponent = () => {
  const { deleteOneLesson, loadingAllLessons, teacherLessons } = useLessons()

  const handleDelete = (id: number | undefined) => {
    deleteOneLesson(id)
  }

  if (teacherLessons.length === 0) {
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
      {loadingAllLessons ? (
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
            {teacherLessons?.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell textAlign="end">
                  {dateFormatter(item.created_at)}
                </Table.Cell>
                <Table.Cell textAlign="end">
                  {dateFormatter(item.updated_at)}
                </Table.Cell>
                <Table.Cell textAlign="end" onClick={() => {}}>
                  <Flex justifyContent={'end'}>
                    <TiEdit color="#6FCF97" size={24} />
                  </Flex>
                </Table.Cell>
                <Table.Cell
                  textAlign="end"
                  onClick={() => {
                    handleDelete(item.id)
                  }}
                >
                  <Flex justifyContent={'end'}>
                    <PiTrash color="b30000" size={24} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Flex>
  )
}
