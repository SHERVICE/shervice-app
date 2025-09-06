import { useMMKVObject } from 'react-native-mmkv';

interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export function useAuthTokens() {
  // Chave 'auth' armazena diretamente um objeto AuthTokens
  const [auth, setToken] = useMMKVObject<AuthTokens>('auth');

  return {
    accessToken: auth?.accessToken ?? null,
    refreshToken: auth?.refreshToken ?? null,
    setToken,
  };
}
