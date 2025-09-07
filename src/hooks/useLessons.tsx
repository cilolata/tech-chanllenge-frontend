import { authContext } from '@/contexts/AuthContext'
import type { IPost } from '@/interfaces'
import { deleteLesson, getAllLessons, getLesson, postLesson } from '@/services/lessons'
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

  const fetchAllLessons = async () => {
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

  const fetchLesson = async (id?: string | number) => {
    setLoadingLesson(true)
    try {
      if (!id) throw Error()
      const res = await getLesson(id)
      setPost(res.post)
      setTeacherName(res.professor)
      setLoadingLesson(false)
    } catch {
      setLoadingLesson(false)
    }
  }

  const createLesson = async (data: any) => {
    try {
      const res = await postLesson(data)
      fetchAllLessons()
      return res
    } catch (err) {
      console.log(err)
    }
  }

  const deleteOneLesson = async (id: any) => {
    try {
      await deleteLesson(id)
      fetchAllLessons()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const fetch = () => {
      fetchAllLessons()
    }
    fetch()
  }, [])

  return {
    posts,
    post,
    teacherName,
    loadingAllLessons,
    loadingLesson,
    fetchLesson,
    fetchAllLessons,
    teacherLessons,
    deleteOneLesson,
    createLesson
  }
}

export default useLessons
