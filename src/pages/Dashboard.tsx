import { TableComponent } from '@/components/Table'
import { Stack, Text } from '@chakra-ui/react'

export const Dashboard = () => {
  return (
    <Stack h={'full'} w={'full'} marginTop={'64px'}>
      <Text as={'h1'} fontSize={'lg'} fontWeight={'bold'} padding={'32px 64px'}>
        Dashboard de postagens
      </Text>
      <TableComponent />
    </Stack>
  )
}
