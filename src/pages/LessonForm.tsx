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
      video: undefined as unknown as File | undefined,
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
      const formData = new FormData()
      formData.append("video", rest.video)
      formData.append("title", rest.title)
      formData.append("description", rest.description)      
      formData.append("content", rest.content)
      formData.append("subject", rest.subject)
      formData.append("user_id", rest.user_id)


      if (editId) {
        await handlePutLesson(editId, formData)
      } else {
        await handleCreateLesson(formData)
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
              <Text as="label" tabIndex={0}>
                Matéria
                <Input {...field} placeholder={'Matéria'} />
              </Text>
            )}
          />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Text as="label" tabIndex={0}>
                Título
                <Input {...field} placeholder={'Título'} />
              </Text>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Text as="label" tabIndex={0}>
                Descrição
                <Input {...field} placeholder={'Descrição'} />
              </Text>
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Text as="label" tabIndex={0}>
                Conteúdo
                <Textarea placeholder={'Conteúdo'} {...field} />
              </Text>
            )}
          />
          <Controller
            name="video"
            control={control}
            render={({ field }) => (
              <>
              <Text tabIndex={0}>Upload de vídeo</Text>
              <input aria-label='input de upload' accept=".mp4" type='file' onChange={(e) => {
                field.onChange(e)
                setValue('video', e.target?.files?.[0])
              }} />
              </>
            )}
          />
          <Flex
            direction={['column', 'row']}
            justifyContent={'flex-end'}
            gap={'16px'}
          >
            <Button
              w={['full', '200px']}
              size="lg"
              variant={'outline'}
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
              bg={'green.800'} 
              _hover={{ bg: 'green2' }}
              >
              Enviar
            </Button>
          </Flex>
        </form>
      )}
    </Stack>
  )
}
