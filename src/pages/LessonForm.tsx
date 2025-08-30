import RichTextEditor from '@/components/RichText'
import { postLesson } from '@/services'
import { Button, Flex, Input, Stack, Text } from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'

export const LessonForm = () => {
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
      content: '',
      subject: '',
      user_id: 3,
    },
  })

  const onSubmit = async (data: any) => {
   const res = await postLesson(data)
   console.log(res)
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
