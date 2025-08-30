import { BrowserRouter, Route, Routes } from 'react-router'
import { Dashboard } from '../pages/Dashboard'
import { Home } from '../pages/Home'
import Layout from '../layout/Layout'
import { Lesson } from '../pages/Lesson'
import { Lessons } from '../pages/Lessons'
import { LessonForm } from '@/pages/LessonForm'

export const RoutingManager: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="aulas" element={<Lessons />} />
          <Route path="aula/:id" element={<Lesson />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="aula/criar" element={<LessonForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
