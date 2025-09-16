import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { api } from "@/services/api";
import { Box, Button, Container, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { errorToast } from "@/utils/toast";

type Post = { id: number; title: string; author: string; description?: string; content?: string };

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<Post>(`/posts/${id}`);
        setPost(res);
      } catch (e: any) {
        errorToast(toast, "Falha ao carregar post", e?.message);
      }
    })();
  }, [id]);

  if (!post) return <Container pt={10}>Carregando…</Container>;

  return (
    <Container maxW="3xl" pt={10}>
      <Stack gap={4}>
        <Heading>{post.title}</Heading>
        <Text color="gray.600">por {post.author}</Text>
        {post.description && <Text>{post.description}</Text>}
        <Box mt={2} whiteSpace="pre-wrap">{post.content ?? "— sem conteúdo —"}</Box>
        <Button as={RouterLink} to="/" mt={4} w="fit-content">Voltar</Button>
      </Stack>
    </Container>
  );
}
