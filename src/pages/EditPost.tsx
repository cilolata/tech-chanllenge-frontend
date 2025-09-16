import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Container, Input, Stack, Textarea, useToast } from "@chakra-ui/react";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { errorToast, successToast } from "@/utils/toast";

type Form = { title: string; author: string; description?: string; content?: string };

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const nav = useNavigate();
  const toast = useToast();

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<Form>({
    defaultValues: { title: "", author: "", description: "", content: "" },
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get<Form>(`/posts/${id}`, token!);
        reset(data);
      } catch (e: any) {
        errorToast(toast, "Erro ao carregar post", e?.message);
      }
    })();
  }, [id, token, reset]);

  const onSubmit = async (data: Form) => {
    try {
      await api.send("PUT", `/posts/${id}`, data, token!);
      successToast(toast, "Post atualizado");
      nav("/admin");
    } catch (e: any) {
      errorToast(toast, "Erro ao atualizar post", e?.message);
    }
  };

  return (
    <Container maxW="3xl" pt={10}>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3}>
              <Input placeholder="Título" {...register("title", { required: true })} />
              <Input placeholder="Autor" {...register("author", { required: true })} />
              <Input placeholder="Descrição (opcional)" {...register("description")} />
              <Textarea rows={10} placeholder="Conteúdo" {...register("content")} />
              <Button type="submit" isLoading={isSubmitting}>Atualizar</Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}
