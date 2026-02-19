import { useAccessibilityContext } from '@/contexts/Accessibility'
import { authContext } from '@/contexts/AuthContext'
import { Box, Flex, Text, HStack, Container, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { PiStudentBold } from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router'

export const Navbar = () => {
  const [isSelected, setIsSelected] = useState<string>('sm')
  const navigate = useNavigate()
  const location = useLocation()
  const { sessionData, isTeacher, clearSession } = authContext()
  const { handleVoiceOver } = useAccessibilityContext()
  const name = sessionData()?.username

  const {
    setReadingMode,
    isLessonPage,
    readingMode,
    showVideo,
    handleContrastToggle,
    isContrast,
    handleSmallText,
    handleMediumText,
    handleLargeText,
  } = useAccessibilityContext()

  if (readingMode) return null

  return (
    <Box
      className="navbar"
      w={'full'}
      bg={!isContrast ? 'white' : 'black'}
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
        className="navbar"
        justifyContent={'space-between'}
        alignItems={'center'}
        h={'full'}
        paddingX={'24px'}
        gap={'16px'}
      >
        <HStack gap={'16px'} className="navbar">
          <Container
            w={'fit-content'}
            bg={'pink'}
            padding={'8px'}
            rounded={'full'}
          >
            <PiStudentBold size={'24px'} />
          </Container>
          {name && <Text>{name}</Text>}
          {isLessonPage &&
            !showVideo &&
            !location.pathname.includes('/login') && (
              <Button
                bg={'white'}
                variant={'ghost'}
                borderRadius={'4px'}
                onClick={() => {
                  setReadingMode(true)
                }}
              >
                Modo leitura
              </Button>
            )}
          <Button
            bg={'white'}
            variant={'ghost'}
            borderRadius={'4px'}
            onClick={handleVoiceOver}
          >
            Ativar voice over
          </Button>
          <Button
            bg={'white'}
            variant={'ghost'}
            _hover={{ bg: 'gray5' }}
            borderRadius={'4px'}
            onClick={() => {
              handleContrastToggle()
            }}
          >
            Contraste
          </Button>
          <Button
            bg={isSelected === 'sm' ? 'gray5' : 'white'}
            variant={'outline'}
            fontSize={'sm'}
            _hover={{ bg: 'gray5' }}
            borderRadius={'4px'}
            onClick={() => {
              handleSmallText()
              setIsSelected('sm')
            }}
          >
            A
          </Button>
          <Button
            bg={isSelected === 'md' ? 'gray5' : 'white'}
            variant={'outline'}
            _hover={{ bg: 'gray5' }}
            fontSize={'md'}
            borderRadius={'4px'}
            onClick={() => {
              setIsSelected('md')
              handleMediumText()
            }}
          >
            A
          </Button>
          <Button
            bg={isSelected === 'lg' ? 'gray5' : 'white'}
            variant={'outline'}
            _hover={{ bg: 'gray5' }}
            fontSize={'lg'}
            borderRadius={'4px'}
            onClick={() => {
              setIsSelected('lg')
              handleLargeText()
            }}
          >
            A
          </Button>
        </HStack>
        <HStack gap={'16px'} className="navbar">
          {isTeacher && (
            <Button
              bg={'white'}
              variant={'ghost'}
              _hover={{ bg: 'gray5' }}
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
                bg={'white'}
                variant={'ghost'}
                borderRadius={'4px'}
                _hover={{ bg: 'gray5' }}
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
                  bg={'white'}
                  variant={'ghost'}
                  _hover={{ bg: 'gray5' }}
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
                bg={'white'}
                _hover={{ bg: 'gray5' }}
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
