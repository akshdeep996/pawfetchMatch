


const logout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        return { success: true };
      } else {
        throw new Error('Error logging out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };
  
  export default logout;
  