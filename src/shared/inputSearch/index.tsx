import { InputGroup, Input, Container } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'

interface InputSearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputSearch: React.FC<InputSearchProps> = ({ onChange }) => {
  return (
    <Container  maxW={{ sm: 'full', md: '600px' }}>
      <InputGroup startElement={<LuSearch />}>
        <Input bg={'white'} rounded="16px" placeholder="Pesquisar" onChange={onChange} />
      </InputGroup>
    </Container>
  )
}
