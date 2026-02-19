import { VStack, Heading, Stack } from '@chakra-ui/react'

interface LessonContentProps {
    title?: string;
    content?: string;
}

export const LessonContent: React.FC<LessonContentProps> = ({ title, content }) => {
    return (
        <Stack w={'full'} h={'full'} gap={'24px'}>
            <VStack gap={'24px'} padding={'16px'} justifyContent={'center'}>
                <Heading tabIndex={0}>{title ?? ''}</Heading>
            </VStack>
            <VStack gap={'24px'} padding={'0 16px'} justifyContent={'center'}>
                {content && <div tabIndex={0} dangerouslySetInnerHTML={{ __html: content }} />}
            </VStack>
        </Stack>
    )
}
