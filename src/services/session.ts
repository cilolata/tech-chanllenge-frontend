export const getLogin = async (dataLogin: any) => {
    const { register, ...rest } = dataLogin
    try {
      const response = await fetch(
        `https://postai-latest.onrender.com/${register ? 'cadastrar' : 'login'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(rest),
        }
      )
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const data = await response.json()
      return { data, statu: response.ok, statusCode: response.status }
    } catch (error) {
      throw error
    }
  }
  