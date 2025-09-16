import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Container, Input, Stack, Textarea, useToast } from "@chakra-ui/react";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "@/utils/toast";

type Form = { title: string; author: string; description?: string; content?: string };

export default function NewPost() {
  const { token } = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<Form>({
    defaultValues: { title: "", author: "", description: "", content: "" },
  });

  const onSubmit = async (data: Form) => {
    try {
      await api.send("POST", "/posts", data, token!);
      successToast(toast, "Post criado com sucesso");
      nav("/admin");
    } catch (e: any) {
      errorToast(toast, "Erro ao criar post", e?.message);
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
              <Button type="submit" isLoading={isSubmitting}>Salvar</Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}
