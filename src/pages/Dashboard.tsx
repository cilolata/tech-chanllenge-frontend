import { TableComponent } from '@/components/table'
import { Button, HStack, Stack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export const Dashboard = () => {
  const navigate = useNavigate()

  return (
    <Stack h={'full'} w={'full'} marginTop={'64px'}>
      <HStack w={'full'} justifyContent={'space-between'} paddingX={'24px'}>
        <Text
          as={'h1'}
          fontSize={'lg'}
          fontWeight={'bold'}
          padding={'32px 64px'}
        >
          Dashboard de postagens
        </Text>
        <Button
          bg={'green.800'}
          onClick={() => {
            navigate(`/aula/criar`)
          }}
        >
          Criar aula
        </Button>
      </HStack>
      <TableComponent />
    </Stack>
  )
}
