// src/pages/PostsList.tsx
import { useEffect, useMemo, useState } from "react";
import { Input, Stack, Card, CardBody, Text, Button, SimpleGrid, Spinner, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";

// Ajuste aqui se seu back usa campos diferentes
type Post = {
  id: number | string;
  title?: string;
  name?: string;
  author?: string;// src/pages/PostsList.tsx
import { useEffect, useState } from "react";
import { Input, Stack, Card, CardBody, Text, Button, SimpleGrid, Spinner, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { api } from "@/services/api";
import { errorToast } from "@/utils/toast";

type Post = { id: number | string; title: string; author: string; description?: string };

export default function PostsList() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async (search?: string) => {
    setLoading(true);
    try {
      // 🔑 Aqui usamos o endpoint do back-end com search
      const url = search ? `/posts?search=${encodeURIComponent(search)}` : "/posts";
      const res = await api.get<Post[]>(url);
      setData(res ?? []);
    } catch (e: any) {
      errorToast(() => {}, "Erro ao buscar posts", e?.message);
    } finally {
      setLoading(false);
    }
  };

  // Carrega todos inicialmente
  useEffect(() => { load(); }, []);

  const handleSearch = () => {
    load(q);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Stack p={6} gap={4}>
      <Stack direction={{ base: "column", md: "row" }}>
        <Input
          placeholder="Buscar por palavra-chave"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <Button onClick={handleSearch} isLoading={loading}>Buscar</Button>
        {q && (
          <Button variant="outline" onClick={() => { setQ(""); load(); }}>Limpar</Button>
        )}
      </Stack>

      {loading ? (
        <Center py={16}><Spinner size="lg" /></Center>
      ) : data.length === 0 ? (
        <Center py={12}><Text color="gray.500">Nenhum post encontrado.</Text></Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {data.map((p) => (
            <Card key={String(p.id)}>
              <CardBody>
                <Text fontWeight="bold">{p.title}</Text>
                <Text fontSize="sm" color="gray.500">por {p.author}</Text>
                {p.description && <Text mt={2}>{p.description}</Text>}
                <Button as={Link} to={`/post/${p.id}`} mt={3}>Ler</Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}

  createdBy?: string;
  description?: string;
  content?: string;
};

function norm(s?: string) {
  if (!s) return "";
  return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

export default function PostsList() {
  const [q, setQ] = useState("");
  const [all, setAll] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const displayTitle = (p: Post) => p.title ?? p.name ?? "(sem título)";
  const displayAuthor = (p: Post) => p.author ?? p.createdBy ?? "—";
  const displayDesc = (p: Post) => p.description ?? "";

  // Busca local (title/name, author/createdBy, description, content)
  const filtered = useMemo(() => {
    const nq = norm(q);
    if (!nq) return all;
    return all.filter((p) => {
      const hay = `${displayTitle(p)} ${displayAuthor(p)} ${p.description ?? ""} ${p.content ?? ""}`;
      return norm(hay).includes(nq);
    });
  }, [q, all]);

  const loadAll = async () => {
    setLoading(true);
    try {
      // Carrega tudo uma vez (sem depender de ?search= no back)
      const res = await api.get<Post[]>("/posts");
      setAll(res ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <Stack p={6} gap={4}>
      <Stack direction={{ base: "column", md: "row" }}>
        <Input
          placeholder="Buscar por palavra-chave"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button onClick={() => { /* filtragem é em tempo real; botão opcional */ }} isDisabled={loading}>
          Buscar
        </Button>
        {q && (
          <Button variant="outline" onClick={() => setQ("")} isDisabled={loading}>
            Limpar
          </Button>
        )}
      </Stack>

      {loading ? (
        <Center py={16}><Spinner size="lg" /></Center>
      ) : filtered.length === 0 ? (
        <Center py={12}><Text color="gray.500">Nenhum post encontrado.</Text></Center>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {filtered.map((p) => (
            <Card key={String(p.id)}>
              <CardBody>
                <Text fontWeight="bold">{displayTitle(p)}</Text>
                <Text fontSize="sm" color="gray.500">por {displayAuthor(p)}</Text>
                {displayDesc(p) && <Text mt={2}>{displayDesc(p)}</Text>}
                <Button as={Link} to={`/post/${p.id}`} mt={3}>Ler</Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}
