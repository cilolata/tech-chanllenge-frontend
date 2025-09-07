import { authContext } from '@/contexts/AuthContext'
import type { IPost } from '@/interfaces'
import {
  deleteLesson,
  getAllLessons,
  getLesson,
  postLesson,
  putLesson,
} from '@/services/lessons'
import { useEffect, useState } from 'react'

const useLessons = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [post, setPost] = useState<IPost>()
  const [teacherName, setTeacherName] = useState<string | undefined>('')
  const [teacherLessons, setTeacherLessons] = useState<IPost[]>([])
  const [loadingAllLessons, setLoadingAllLessons] = useState<boolean>(false)
  const [loadingLesson, setLoadingLesson] = useState<boolean>(false)

  const { sessionData, isTeacher } = authContext()
  const userId = sessionData().userId

  const handleLessons = async () => {
    setLoadingAllLessons(true)
    try {
      const response = await getAllLessons()
      setPosts(response.posts)

      if (isTeacher()) {
        setTeacherLessons(
          response.posts.filter(
            (item: IPost) => Number(item.user_id) === Number(userId)
          )
        )
      }
      setLoadingAllLessons(false)
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

  const handleCreateLesson = async (data: any) => {
    try {
      const res = await postLesson(data)
      handleLessons()
      return res
    } catch (err) {
      console.log(err)
    }
  }

  const handlePutLesson = async (id: any, data: any) => {
    try {
      await putLesson(id, data)
      handleLessons()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteLesson = async (id: any) => {
    try {
      await deleteLesson(id)
      handleLessons()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetch = () => {
      handleLessons()
    }
    fetch()
  }, [])

  return {
    posts,
    post,
    teacherName,
    loadingAllLessons,
    loadingLesson,
    teacherLessons,
    handleGetLesson,
    handleLessons,
    handleDeleteLesson,
    handleCreateLesson,
    handlePutLesson,
  }
}

export default useLessons
