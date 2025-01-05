// authService.js

// Benutzerregistrierung
export const registerUser = async (email, password) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
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

// Benutzeranmeldung
export const loginUser = async (email, password) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
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
  localStorage.setItem('token', token); // Token im localStorage speichern

  return true;
};
