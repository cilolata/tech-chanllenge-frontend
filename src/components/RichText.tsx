import useRichText from '@/hooks/useRichText'
import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

interface IRichTextEditor {
  onClick: (value?: string) => void
  value?: any
}

export const RichTextEditor = ({ onClick, value }: IRichTextEditor) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [saved, setSaved] = useState(false)

  const { handleBoldFormat, handleItalicFormat, handleUnderlineFormat } =
    useRichText()

  useEffect(() => {
    if(value) {
      editorRef.current!.innerHTML = value ?? ''
    }
  }, [value])

  const handleSave = () => {
    const content = editorRef.current?.innerHTML
    onClick(content)
    setSaved(true)
  }

  useEffect(() => {
      setSaved(false)
  }, [])

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
        bg={'pink'}
        color={'gray2'}
        borderRadius={'sm'}
        marginRight={'1'}
        onClick={handleSave}
      >
        {saved ? 'Texto salvo' : 'Salvar texto'}
      </Button>
    </Stack>
  )
}

export default RichTextEditor
