import { AlertComponent } from '@/components/Alert'
import { authContext } from '@/contexts/AuthContext'
import { HTTPResponseStatus } from '@/interfaces'
import { getLogin } from '@/services/session'
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
  Box,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [erroMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()

  const { handleWriteSession } = authContext()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      if (isRegister && response.status === HTTPResponseStatus.CREATED) {
        setIsRegister(false)
        setIsLoading(false)
        setErrorMessage('')
      }

      if (!isRegister && response.status === HTTPResponseStatus.OK) {
        navigate('/aulas')
        setIsLoading(false)
        handleWriteSession(response.data)
        setErrorMessage('')
      }

      if (response.status === HTTPResponseStatus.NOT_FOUND) {
        setErrorMessage(response?.data?.message)
        throw Error()
      }
    } catch (error) {
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
                rules={{
                  required: 'Preencha seu nome',
                }}
                control={control}
                render={({ field }) => {
                  return (
                    <Field.Root invalid={!!errors.username}>
                      <Field.Label>
                        Nome<Text color={'red'}>*</Text>{' '}
                        <Field.RequiredIndicator />
                      </Field.Label>
                      <Input {...field} />
                      <Field.ErrorText>
                        {errors.username?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  )
                }}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Preencha seu e-mail',
                }}
                render={({ field }) => (
                  <Field.Root invalid={!!errors.email}>
                    <Field.Label>
                      E-mail<Text color={'red'}>*</Text>{' '}
                    </Field.Label>
                    <Input type="email" {...field} />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Field.Root>
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  required:'Preencha sua senha',
                }}
                render={({ field }) => (
                  <Field.Root invalid={!!errors.password}>
                    <Field.Label>
                      Senha<Text color={'red'}>*</Text>
                    </Field.Label>
                    <Input type="password" {...field} />
                    <Field.ErrorText>
                      {errors.password?.message}
                    </Field.ErrorText>
                  </Field.Root>
                )}
              />
              <Box mt={'1'}>
                {erroMessage && (
                  <AlertComponent title={erroMessage} statusType={'error'} />
                )}
              </Box>
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
            <Button
              variant="outline"
              onClick={() => {
                setErrorMessage('')
                setIsRegister(false)
              }}
            >
              Cancelar
            </Button>
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
            color={'green2'}
            onClick={() => {
              setIsRegister(true)
              setErrorMessage('')
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
