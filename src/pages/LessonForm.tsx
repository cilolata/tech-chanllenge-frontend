import RichTextEditor from '@/components/RichText'
import { authContext } from '@/contexts/AuthContext'
import useLessons from '@/hooks/useLessons'
import { HTTPResponseStatus } from '@/interfaces'
import { Button, Flex, Input, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router'

export const LessonForm = () => {
  const [loading, setLoading] = useState(false)
  const { sessionData } = authContext()
  const { createLesson } = useLessons()
  const navigate = useNavigate()

  const userId = sessionData().userId

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
      content: '',
      subject: '',
      user_id: userId ?? '',
    },
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const res = await createLesson(data)
      if (res?.status === HTTPResponseStatus.CREATED) {
        navigate('/dashboard')
      }
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
            <>
              <RichTextEditor
                {...field}
                onClick={(value) => {
                  if (value) {
                    setValue(field.name, value)
                  }
                }}
              />
            </>
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
    </Stack>
  )
}
