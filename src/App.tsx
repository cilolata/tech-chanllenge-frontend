// src/App.tsx
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import PostsList from "@/pages/PostsList";
import PostDetail from "@/pages/PostDetail";
import Login from "@/pages/Login";
import AdminList from "@/pages/AdminList";
import NewPost from "@/pages/NewPost";
import EditPost from "@/pages/EditPost";

export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><AdminList /></ProtectedRoute>} />
            <Route path="/admin/new" element={<ProtectedRoute><NewPost /></ProtectedRoute>} />
            <Route path="/admin/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}
