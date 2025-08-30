import { InputGroup, Input, Container } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'

export const InputSearch = () => {
  return (
    <Container maxW={{ sm: 'full', md: '600px' }}>
      <InputGroup startElement={<LuSearch />}>
        <Input rounded="16px" placeholder="Pesquisar" />
      </InputGroup>
    </Container>
  )
}
