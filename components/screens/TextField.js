import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
}) {
  const [show, setShow] = useState(false);
  const isPassword = !!secureTextEntry;

  return (
    <View style={{ marginBottom: 16 }}>
      {label ? (
        <Text style={{ marginBottom: 6, fontWeight: '600' }}>{label}</Text>
      ) : null}
      <View
        style={{
          borderWidth: 1,
          borderColor: error ? '#ef4444' : '#d1d5db',
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPassword && !show}
          autoCapitalize={isPassword ? 'none' : 'none'}
          style={{ flex: 1, fontSize: 16 }}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShow((s) => !s)}
            accessibilityLabel="Toggle password visibility">
            <Ionicons name={show ? 'eye-off' : 'eye'} size={22} />
          </TouchableOpacity>
        )}
      </View>
      {!!error && (
        <Text style={{ color: '#ef4444', marginTop: 6 }}>{error}</Text>
      )}
    </View>
  );
}
