import { authContext } from '@/contexts/AuthContext'
import {
  Box,
  Flex,
  Link,
  Text,
  HStack,
  Container,
  Button,
} from '@chakra-ui/react'
import { PiStudentBold } from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router'

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { sessionData, isTeacher, clearSession } = authContext()
  const name = sessionData()?.username

  return (
    <Box
      w={'full'}
      bg={'white'}
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
          {isTeacher && (
            <Button
              variant={'ghost'}
              borderBottom={
                location.pathname.includes('/dashboard')
                  ? '2px solid green'
                  : 'none'
              }
              onClick={() => navigate('dashboard')}
            >
              Dashboard
            </Button>
          )}
          {sessionData().userId && (
            <>
              <Button
                variant={'ghost'}
                borderRadius={'4px'}
                borderBottom={
                  location.pathname.includes('/aulas')
                    ? '2px solid green'
                    : 'none'
                }
                onClick={() => {
                  navigate('/aulas')
                }}
              >
                Aulas
              </Button>
              {!isTeacher && (
                <Button
                  variant={'ghost'}
                  borderRadius={'4px'}
                  borderBottom={
                    location.pathname.includes('/audio')
                      ? '2px solid green'
                      : 'none'
                  }
                  onClick={() => {
                    navigate('/audio')
                  }}
                >
                  Transcrição de áudio
                </Button>
              )}
              <Button
                variant={'ghost'}
                onClick={() => {
                  navigate('/login')
                  clearSession()
                }}
              >
                Sair
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  )
}
