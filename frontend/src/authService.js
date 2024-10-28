export const registerUser = async (email, password) => {
  const response = await fetch('http://localhost:3001/api/users/register', { // Volle URL verwenden
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
      throw new Error('Failed to register user');
  }

  return true;
};

export const loginUser = async (email, password) => {
    const response = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Invalid email or password');
    }
  
    const { token } = await response.json();
    localStorage.setItem('token', token);
  
    return true;
  };
  