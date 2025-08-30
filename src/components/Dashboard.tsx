import { Flex, Stack, Table, Text } from '@chakra-ui/react'

const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
]

export const Dashboard = () => {
  return (
    <Stack h={'full'} w={'full'} marginTop={'64px'}>
      <Text as={'h1'} fontSize={'lg'} fontWeight={'bold'} padding={'32px 64px'}>
        Dashboard de postagens
      </Text>
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
    </Stack>
  )
}
