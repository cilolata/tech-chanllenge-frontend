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

    const data = await response.json()
    return { data, status: response.status }
  } catch (error) {
    throw error
  }
}
