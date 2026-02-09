import { BrowserRouter, Route, Routes, useNavigate } from 'react-router'
import { Dashboard } from '../pages/Dashboard'
import { Home } from '../pages/Home'
import Layout from '../layout/Layout'
import { Lesson } from '../pages/Lesson'
import { Lessons } from '../pages/Lessons'
import { LessonForm } from '@/pages/LessonForm'
import { AudioRecorder } from '@/components/audioRecorder'

export const RoutingManager: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Home />} />
        <Route path="/" element={<Layout />}>
          <Route index path="aulas" element={<Lessons />} />
          <Route path="aula/:id" element={<Lesson />} />
          <Route path="audio" element={<AudioRecorder />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="aula/criar" element={<LessonForm />} />
          <Route path="aula/editar/:id" element={<LessonForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
