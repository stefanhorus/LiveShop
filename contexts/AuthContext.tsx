import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Încarcă token-ul din localStorage la mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL || 'https://vercel.saleor.cloud/graphql/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation TokenCreate($email: String!, $password: String!) {
              tokenCreate(email: $email, password: $password) {
                token
                refreshToken
                user {
                  id
                  email
                  firstName
                  lastName
                }
                errors {
                  field
                  message
                }
              }
            }
          `,
          variables: { email, password },
        }),
      });

      const data = await response.json();
      const result = data.data?.tokenCreate;

      if (result?.token && result?.user) {
        setToken(result.token);
        setUser(result.user);
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('authUser', JSON.stringify(result.user));
        return true;
      } else {
        console.error('Login failed:', result?.errors);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string): Promise<boolean> => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL || 'https://vercel.saleor.cloud/graphql/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation AccountRegister($email: String!, $password: String!, $firstName: String, $lastName: String) {
              accountRegister(
                input: {
                  email: $email
                  password: $password
                  firstName: $firstName
                  lastName: $lastName
                }
              ) {
                user {
                  id
                  email
                  firstName
                  lastName
                }
                errors {
                  field
                  message
                }
              }
            }
          `,
          variables: { email, password, firstName, lastName },
        }),
      });

      const data = await response.json();
      const result = data.data?.accountRegister;

      if (result?.user && !result?.errors?.length) {
        // După înregistrare, autentifică automat utilizatorul
        return await login(email, password);
      } else {
        console.error('Registration failed:', result?.errors);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
