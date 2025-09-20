import { authContext } from '@/contexts/AuthContext'
import { Box, Flex, Link, Text, HStack, Container } from '@chakra-ui/react'
import { PiStudentBold } from 'react-icons/pi'
import { useNavigate } from 'react-router'

export const Navbar = () => {
  const navigate = useNavigate()
  const { sessionData, isTeacher, clearSession } = authContext()
  const name = sessionData()?.username

  return (
    <Box
      w={'full'}
      bg={'gray6'}
      zIndex={'banner'}
      borderBottomWidth={'1.2px'}
      h={'64px'}
      position={'fixed'}
      top={0}
      left={0}
      right={0}
      shadow={'sm'}
    >
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        h={'full'}
        paddingX={'24px'}
        gap={'16px'}
      >
        <HStack gap={'16px'}>
          <Container
            w={'fit-content'}
            bg={'pink'}
            padding={'8px'}
            rounded={'full'}
          >
            <PiStudentBold size={'24px'} />
          </Container>
          {name && <Text>{name}</Text>}
        </HStack>
        <HStack gap={'16px'}>
          {isTeacher() && (
            <Link onClick={() => navigate('dashboard')}>Dashboard</Link>
          )}
          {sessionData().userId && (
            <>
              <Link
                onClick={() => {
                  navigate('/aulas')
                }}
              >
                Aulas
              </Link>
              <Link
                onClick={() => {
                  navigate('/')
                  clearSession()
                }}
              >
                Sair
              </Link>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  )
}
