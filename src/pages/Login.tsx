import { useState } from "react";
import { Button, Card, CardBody, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "@/utils/toast";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("prof@exemplo.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErr(null);
      await login(email, password);
      successToast(toast, "Login realizado", "Bem-vindo!");
      nav("/admin");
    } catch (e: any) {
      const msg = e?.message ?? "Falha no login";
      setErr(msg);
      errorToast(toast, "Erro no login", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <Card maxW="md" mx="auto" mt={12}>
        <CardBody>
          <Stack gap={3}>
            <Text fontSize="xl" fontWeight="bold">Login de Professor</Text>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
            {err && <Text color="red.500">{err}</Text>}
            <Button type="submit" isLoading={loading}>Entrar</Button>
          </Stack>
        </CardBody>
      </Card>
    </form>
  );
}
