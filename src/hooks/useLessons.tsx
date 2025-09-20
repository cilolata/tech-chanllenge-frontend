import type { IPost } from '@/interfaces'
import {
  deleteLesson,
  getAllLessons,
  getLesson,
  postLesson,
  putLesson,
  searchLesson,
} from '@/services/lessons'
import { useState } from 'react'

const useLessons = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [post, setPost] = useState<IPost>()
  const [teacherName, setTeacherName] = useState<string | undefined>('')
  const [loadingAllLessons, setLoadingAllLessons] = useState<boolean>(false)
  const [loadingLesson, setLoadingLesson] = useState<boolean>(false)
  const [loadingDashboard, setLoadingDashboard] = useState<boolean>(false)

  const handleLessons = async () => {
    setLoadingAllLessons(true)
    try {
      const response = await getAllLessons()
      setPosts(response.posts)
      setLoadingAllLessons(false)
      setLoadingDashboard(false)
    } catch {
      setLoadingAllLessons(false)
    }
  }

  const handleGetLesson = async (id?: string | number) => {
    setLoadingLesson(true)
    try {
      if (!id) throw Error()
      const res = await getLesson(id)
      setPost(res.post)
      setTeacherName(res.professor)
      setLoadingLesson(false)
      return res.post
    } catch {
      setLoadingLesson(false)
    }
  }

  const handleSearchLesson = async (search?: string) => {
    setLoadingAllLessons(true)
    try {
      if (!search) {
        await handleLessons()
      } else {
        const res = await searchLesson(search)
        setPosts(res.posts)
      }
      setLoadingAllLessons(false)
    } catch {
      setLoadingAllLessons(false)
    }
  }

  const handleCreateLesson = async (data: any) => {
    try {
      setLoadingDashboard(true)
      const res = await postLesson(data)
      await handleLessons()
      return res
    } catch (err) {
      console.log(err)
    }
  }

  const handlePutLesson = async (id: any, data: any) => {
    try {
      setLoadingDashboard(true)
      await putLesson(id, data)
      await handleLessons()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteLesson = async (id: any) => {
    try {
      setLoadingDashboard(true)
      await deleteLesson(id)
      await handleLessons()
    } catch (err) {
      console.log(err)
      setLoadingDashboard(false)
    }
  }


  useEffect(() => {
    const fetch = async () => {
      await handleLessons()
    }
    fetch()
  }, [])

  return {
    posts,
    post,
    teacherName,
    loadingAllLessons,
    loadingLesson,
    loadingDashboard,
    handleLessons,
    handleSearchLesson,
    handleGetLesson,
    handleDeleteLesson,
    handleCreateLesson,
    handlePutLesson,
  }
}

export default useLessons
