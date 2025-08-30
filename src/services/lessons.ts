export const getAllLessons = async () => {
    try {
      const response = await fetch('https://postai-latest.onrender.com/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }
  
  export const getLesson = async (id: number | string) => {
    try {
      const response = await fetch(
        `https://postai-latest.onrender.com/posts/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  }
  
  export const postLesson = async (data: any) => {
    try {
      const response = await fetch(` https://postai-latest.onrender.com/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      throw error
    }
  }
  