import { useEffect, useState } from "react";
import { Button, Table, Thead, Tr, Th, Tbody, Td, Stack, Container, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { errorToast, successToast } from "@/utils/toast";

type Post = { id: number; title: string; author: string };

export default function AdminList() {
  const { token } = useAuth();
  const [rows, setRows] = useState<Post[]>([]);
  const toast = useToast();

  const load = async () => {
    try {
      const list = await api.get<Post[]>("/posts", token!);
      setRows(list);
    } catch (e: any) {
      errorToast(toast, "Erro ao carregar posts", e?.message);
    }
  };

  const del = async (id: number) => {
    try {
      await api.send("DELETE", `/posts/${id}`, undefined, token!);
      successToast(toast, "Post excluído");
      await load();
    } catch (e: any) {
      errorToast(toast, "Erro ao excluir", e?.message);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <Container maxW="5xl" pt={10}>
      <Stack gap={3}>
        <Stack direction="row" justify="space-between" align="center">
          <h2>Administração de Posts</h2>
          <Button as={Link} to="/admin/new">Novo Post</Button>
        </Stack>
        <Table>
          <Thead>
            <Tr><Th>Título</Th><Th>Autor</Th><Th>Ações</Th></Tr>
          </Thead>
          <Tbody>
            {rows.map((r) => (
              <Tr key={r.id}>
                <Td>{r.title}</Td>
                <Td>{r.author}</Td>
                <Td>
                  <Stack direction="row">
                    <Button as={Link} to={`/admin/edit/${r.id}`} size="sm">Editar</Button>
                    <Button onClick={() => del(r.id)} colorScheme="red" size="sm">Excluir</Button>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Container>
  );
}
