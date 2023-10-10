import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';

import { toast } from 'react-toastify';
import api from '../services/api';

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.
  const [authStatusMessage, setAuthStatusMessage] = useState(null); // Error or success message

  useEffect(() => {
    let ignore = false;

    async function checkAuthenticated() {
      try {
        const storageToken = localStorage.getItem('token');

        if (storageToken) {
          api.defaults.headers.Authorization = `Bearer ${storageToken}`;

          const response = await api.get('/api/users/me');
          if (!ignore) {
            setUser(response.data);
          }
        }
      } catch (error) {
        const errMessage = error.response?.data
          ? `${error.response.data.error.message}. (${error.response.data.error.name}).`
          : `${error.message}. (${error.name}).`;

        setAuthStatusMessage({
          type: 'error',
          message: errMessage,
        });
      } finally {
        setLoadingUser(false);
      }
    }

    checkAuthenticated();
    return () => {
      ignore = true;
    };
  }, []);

  // Display toast messages dynamically based on type (error, success, etc)
  useEffect(() => {
    if (authStatusMessage) {
      const { type, message } = authStatusMessage;
      toast[type](message);
    }
  }, [authStatusMessage]);

  function storeToken(accessToken) {
    localStorage.setItem('token', accessToken);

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }

  const logIn = useCallback(async (email, password) => {
    try {
      const data = { email, password };

      const response = await api.post('/api/auth/login', data);

      storeToken(response.data.jwt);

      setUser(response.data.user);

      setAuthStatusMessage({
        type: 'success',
        message: 'Login realizado com sucesso.',
      });
    } catch (error) {
      const errMessage = error.response?.data
        ? `${error.response.data.error.message}. (${error.response.data.error.name}).`
        : `${error.message}. (${error.name}).`;

      setAuthStatusMessage({
        type: 'error',
        message: errMessage,
      });
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      localStorage.removeItem('token');

      setUser(null);

      setAuthStatusMessage({
        type: 'success',
        message: 'Deslogado com sucesso.',
      });
    } catch (error) {
      setAuthStatusMessage({
        type: 'error',
        message: `${error.message}. (${error.name}).`,
      });
    }
  }, []);

  // const enviarEmailRedefinirSenha = useCallback(
  //   async (email) => {
  //     try {
  //       await sendPasswordResetEmail(auth, email);
  //       setAuthStatusMessage({
  //         type: 'success',
  //         message: 'Email de redefinição de senha enviado com sucesso.',
  //       });
  //     } catch (error) {
  //       setAuthStatusMessage({
  //         type: 'error',
  //         message: firebaseErrorsPTBR[error.code]
  //           ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
  //           : error.message,
  //       });
  //       throw error;
  //     }
  //   },
  //   [auth]
  // );

  // const verificarCodRedefinicaoSenha = useCallback(
  //   async (actionCode) => {
  //     try {
  //       // Verifica se o codigo de redefinicao de senha é valido e retorna o email do usuario
  //       const userEmail = await verifyPasswordResetCode(auth, actionCode);
  //       return userEmail;
  //     } catch (error) {
  //       setAuthStatusMessage({
  //         type: 'error',
  //         message: firebaseErrorsPTBR[error.code]
  //           ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
  //           : error.message,
  //       });
  //       throw error;
  //     }
  //   },
  //   [auth]
  // );

  // const confirmarRedefinicaoSenha = useCallback(
  //   async (actionCode, newPassword) => {
  //     try {
  //       await confirmPasswordReset(auth, actionCode, newPassword);
  //       setAuthStatusMessage({
  //         type: 'success',
  //         message: 'Senha redefinida com sucesso.',
  //       });
  //     } catch (error) {
  //       setAuthStatusMessage({
  //         type: 'error',
  //         message: firebaseErrorsPTBR[error.code]
  //           ? `${firebaseErrorsPTBR[error.code]} (${error.code}).`
  //           : error.message,
  //       });
  //       throw error;
  //     }
  //   },
  //   [auth]
  // );

  const contextValue = useMemo(
    () => ({
      user,
      loadingUser,
      authStatusMessage,
      logIn,
      logOut,
      // enviarEmailRedefinirSenha,
      // verificarCodRedefinicaoSenha,
      // confirmarRedefinicaoSenha,
    }),
    [
      user,
      loadingUser,
      authStatusMessage,
      logIn,
      logOut,
      // enviarEmailRedefinirSenha,
      // verificarCodRedefinicaoSenha,
      // confirmarRedefinicaoSenha,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export function useUser() {
  return useContext(UserContext);
}
