import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 24, fontWeight: '800' }}>
        Hello, {user?.name} 👋
      </Text>
      <Text style={{ fontSize: 16, color: '#6b7280', marginTop: 4 }}>
        {user?.email}
      </Text>

      <TouchableOpacity onPress={logout} style={styles.primaryBtn}>
        <Text style={styles.primaryBtnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  primaryBtn: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  primaryBtnText: { color: 'white', fontWeight: '700', fontSize: 16 },
};
