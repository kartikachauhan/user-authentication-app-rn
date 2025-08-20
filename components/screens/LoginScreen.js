import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import TextField from '../common/TextField';
import { isEmail } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = async () => {
    const nextErr = {};
    if (!isEmail(email)) nextErr.email = 'Invalid email format';
    if (!password) nextErr.password = 'Password is required';
    if (password && password.length < 6)
      nextErr.password = 'Invalid password format (min 6 chars)';
    setErrors(nextErr);
    if (Object.keys(nextErr).length) return;

    try {
      await login({ email, password });
    } catch (e) {
      setErrors({ password: 'Incorrect credentials' });
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 24 }}>
        Welcome back 👋
      </Text>

      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        error={errors.email}
      />

      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
        error={errors.password}
      />

      <TouchableOpacity onPress={onSubmit} style={styles.primaryBtn}>
        <Text style={styles.primaryBtnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={{ marginTop: 16, alignSelf: 'center' }}>
        <Text style={{ color: '#2563eb' }}>Go to Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  primaryBtn: {
    backgroundColor: '#111827',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryBtnText: { color: 'white', fontWeight: '700', fontSize: 16 },
};
