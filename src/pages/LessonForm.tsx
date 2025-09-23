import { authContext } from '@/contexts/AuthContext'
import useLessons from '@/hooks/useLessons'
import {
  Button,
  Flex,
  Input,
  Spinner,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

export const LessonForm = () => {
  const [loading, setLoading] = useState(false)
  const [loadingEdit, setLoadingEdit] = useState(false)

  const { sessionData } = authContext()
  const { handleCreateLesson, handlePutLesson, handleGetLesson } = useLessons()
  const navigate = useNavigate()
  const { id } = useParams()

  const userId = sessionData().userId

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
      content: '',
      subject: '',
      user_id: userId,
      editId: id,
    },
  })

  useEffect(() => {
    if (id) {
      setLoadingEdit(true)
      const fetch = async () => {
        const response = await handleGetLesson(id)
        setValue('title', response.title)
        setValue('description', response.description)
        setValue('content', response.content)
        setValue('subject', response.subject)
        setLoadingEdit(false)
      }
      fetch()
    }
  }, [id])

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const { editId, ...rest } = data
      if (editId) {
        await handlePutLesson(editId, rest)
      } else {
        await handleCreateLesson(rest)
      }
      setLoading(false)
      navigate('/dashboard')
    } catch {
      setLoading(false)
    }
  }

  return (
    <Stack
      as={'section'}
      marginTop={'64px'}
      paddingX={'24px'}
      paddingY={'16px'}
    >
      {loadingEdit ? (
        <VStack
          colorPalette="teal"
          h={'400px'}
          w={'full'}
          align={'center'}
          justifyContent={'center'}
        >
          <Spinner size="xl" color="colorPalette.600" />
          <Text color="colorPalette.600">Carregando...</Text>
        </VStack>
      ) : (
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Text as="label">
                Matéria
                <Input {...field} />
              </Text>
            )}
          />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Text as="label">
                Título
                <Input {...field} />
              </Text>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Text as="label">
                Descrição
                <Input {...field} />
              </Text>
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Text as="label">
                Conteúdo
                <Textarea {...field} />
              </Text>
            )}
          />
          <Flex
            direction={['column', 'row']}
            justifyContent={'flex-end'}
            gap={'16px'}
          >
            <Button
              color={'gray3'}
              w={['full', '200px']}
              size="lg"
              borderColor={'gray5'}
              variant={'ghost'}
              onClick={() => navigate('/dashboard')}
            >
              Cancelar
            </Button>
            <Button
              loading={loading}
              color={'gray5'}
              w={['full', '200px']}
              size="lg"
              type="submit"
              bg={'green1'}
            >
              Enviar
            </Button>
          </Flex>
        </form>
      )}
    </Stack>
  )
}
