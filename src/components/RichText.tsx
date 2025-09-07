import useRichText from '@/hooks/useRichText'
import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { useRef } from 'react'

interface IRichTextEditor {
  onClick: (value?: string) => void
}

export const RichTextEditor = ({ onClick }: IRichTextEditor) => {
  const editorRef = useRef<HTMLDivElement>(null)

  const { handleBoldFormat, handleItalicFormat, handleUnderlineFormat } =
    useRichText()

  const handleSave = () => {
    const content = editorRef.current?.innerHTML
    onClick(content)
  }

  return (
    <Stack h={'full'} w={'full'}>
      <Flex w={'full'}>
        <Button
          borderRadius={'sm'}
          variant={'ghost'}
          marginRight={'1'}
          onClick={handleBoldFormat}
        >
          <Text fontWeight={'bolder'} fontSize={'md'}>
            B
          </Text>
        </Button>
        <Button
          borderRadius={'sm'}
          variant={'ghost'}
          marginRight={'1'}
          onClick={handleItalicFormat}
        >
          <Text fontStyle={'italic'} fontSize={'md'}>
            I
          </Text>
        </Button>
        <Button
          borderRadius={'sm'}
          variant={'ghost'}
          marginRight={'1'}
          onClick={handleUnderlineFormat}
        >
          <Text textDecoration={'underline'} fontSize={'md'}>
            U
          </Text>
        </Button>
      </Flex>
      <Stack
        ref={editorRef}
        contentEditable="true"
        h={'52'}
        w={'full'}
        borderWidth={'thin'}
        overflow={'scroll'}
        outlineColor={'Highlight'}
        paddingX={'3'}
        paddingTop={'2'}
      />
      <Button
        size={'md'}
        maxWidth={'200px'}
        variant={'surface'}
        color={'gray1'}
        borderRadius={'sm'}
        marginRight={'1'}
        onClick={handleSave}
      >
        Salvar texto
      </Button>
    </Stack>
  )
}

export default RichTextEditor
