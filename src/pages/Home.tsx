import { authContext } from '@/contexts/auth-context'
import { HTTPResponseStatus } from '@/interfaces'
import { getLogin } from '@/services'
import { permissionTypeFormatter } from '@/utils'
import {
  Card,
  Stack,
  Field,
  Input,
  Button,
  Text,
  VStack,
  Link,
  Checkbox,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const { handleWriteSession } = authContext()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      permissionType: false,
    },
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const { permissionType, ...rest } = data
      const response = await getLogin({
        permissionType: permissionTypeFormatter(permissionType),
        ...rest,
        register: isRegister,
      })
      if (isRegister && response.statusCode === HTTPResponseStatus.CREATED) {
        setIsRegister(false)
        setIsLoading(false)
      }

      if (!isRegister && response.statusCode === HTTPResponseStatus.OK) {
        navigate('/aulas')
        setIsLoading(false)
        handleWriteSession(response.data)
      }
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }

  return (
    <VStack
      h={'full'}
      w={'full'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card.Root w={{ sm: 'sm', md: 'lg' }}>
          <Card.Header>
            <Card.Title color={'gray1'}>
              {isRegister ? 'Cadastrar' : 'Entrar'}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack gap="4" w="full">
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Field.Root>
                    <Field.Label>Nome</Field.Label>
                    <Input {...field} />
                  </Field.Root>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Field.Root>
                    <Field.Label>Email</Field.Label>
                    <Input type="email" {...field} />
                  </Field.Root>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Field.Root>
                    <Field.Label>Senha</Field.Label>
                    <Input type="password" {...field} />
                  </Field.Root>
                )}
              />
              {isRegister && (
                <Controller
                  name="permissionType"
                  control={control}
                  render={({ field }) => (
                    <Checkbox.Root {...field} mt="2" value="1">
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>Sou professor</Checkbox.Label>
                    </Checkbox.Root>
                  )}
                />
              )}
            </Stack>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline">Cancelar</Button>
            <Button loading={isLoading} type="submit" bg={'green1'}>
              Entrar
            </Button>
          </Card.Footer>
        </Card.Root>
      </form>
      {!isRegister && (
        <Text marginTop={'16px'} fontWeight={'bold'} fontSize={'md'}>
          Não é cadastrado? Faça o seu {''}
          <Link
            onClick={() => {
              setIsRegister(true)
            }}
          >
            {' '}
            cadastro
          </Link>
        </Text>
      )}
    </VStack>
  )
}
