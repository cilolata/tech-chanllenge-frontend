import { CardLesson } from "@/components/CardLesson";
import { InputSearch } from "@/components/InputSearch";
import type { IPost } from "@/interfaces";
import { getAllLessons } from "@/services";
import { VStack, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";


export const Lessons: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await getAllLessons();
      setPosts(response.posts);
    };
    fetch();
  }, []);

  return (
    <VStack as={'section'} gap={'24px'} padding={'24px'} marginTop={'64px'}>
      <InputSearch />
      <Flex
        wrap={'wrap'}
        gap={'16px'}
        justifyContent={'center'}
        paddingX={'24px'}
      >
        {posts.map((item) => {
          return <CardLesson {...item} />;
        })}
      </Flex>
    </VStack>
  );
};
