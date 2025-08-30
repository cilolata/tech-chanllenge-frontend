import { Flex, Table } from '@chakra-ui/react'

interface ITable {
  items: any[]
}

export const TableComponent = ({ items }: ITable) => {
  return (
    <Flex
      direction={'column'}
      h={'full'}
      w={'full'}
      align={'center'}
      padding={'32px 64px'}
    >
      <Table.Root striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell textAlign="end">{item.price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  )
}
