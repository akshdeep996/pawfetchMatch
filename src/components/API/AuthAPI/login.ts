const login = async (name: string, email: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
        credentials: 'include',
      });
  
      if (response.ok) {
        return { success: true };
      } else if (response.status === 400) {
        return { success: false, error: 'Bad Request: Invalid credentials' };
      } else if (response.status === 500) {
        return { success: false, error: 'Connection Error! Please try again' };
      } else {
        return { success: false, error: 'Something went wrong. Please try again.' };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: 'Something went wrong. Please try again.' };
    }
  };
  
  export default login;
  