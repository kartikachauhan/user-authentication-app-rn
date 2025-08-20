import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import TextField from '../common/TextField';
import { isEmail } from '../utils/validation';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const onSubmit = async () => {
    const nextErr = {};
    if (!name.trim()) nextErr.name = 'Name is required';
    if (!isEmail(email)) nextErr.email = 'Invalid email format';
    if (!password) nextErr.password = 'Password is required';
    if (password && password.length < 6)
      nextErr.password = 'Password length less than 6 characters';

    setErrors(nextErr);
    if (Object.keys(nextErr).length) return;

    try {
      await signup({ name, email, password });
    } catch (e) {
      Alert.alert('Signup failed', e.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: '800', marginBottom: 24 }}>
        Create your account ✨
      </Text>

      <TextField
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Your name"
        error={errors.name}
      />
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
        <Text style={styles.primaryBtnText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{ marginTop: 16, alignSelf: 'center' }}>
        <Text style={{ color: '#2563eb' }}>Go to Login</Text>
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
