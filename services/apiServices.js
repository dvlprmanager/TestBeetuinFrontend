// Funcion para consumir api
export const apiService = async (url, method = 'GET', data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'x-token': token }) 
  };

  const options = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) })
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
