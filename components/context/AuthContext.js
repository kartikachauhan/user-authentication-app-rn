import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

const STORAGE_KEY = 'auth:user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to restore session', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async ({ email, password }) => {
    // In real apps, call the API here.
    // For demo, "accept" any email with password 'secret123'
    if (password !== 'secret123') {
      throw new Error('Incorrect credentials');
    }
    const profile = { name: email.split('@')[0], email };
    setUser(profile);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, []);

  const signup = useCallback(async ({ name, email, password }) => {
    // In real apps, call the signup API. Here we just persist locally.
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    const profile = { name, email };
    setUser(profile);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user, login, signup, logout, loading }),
    [user, login, signup, logout, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
