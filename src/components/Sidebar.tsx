import { Avatar, Box, Flex, Link, Text, HStack } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Box
      w={'full'}
      bg={'gray6'}
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
        justifyContent={'space-between'}
        alignItems={'center'}
        h={'full'}
        paddingX={'24px'}
        gap={'16px'}
      > 
        <HStack gap={'16px'}>
          <Avatar.Root variant={'subtle'} bg={'pink'}>
            <Avatar.Fallback name="Segun Adebayo" />
          </Avatar.Root>
          <Text>Fulano de Tal</Text>
        </HStack>
        <HStack gap={'16px'}>
          <Link>Minha conta</Link>
          <Link href="#">Sair</Link>
        </HStack>
      </Flex>
    </Box>
  );
};
