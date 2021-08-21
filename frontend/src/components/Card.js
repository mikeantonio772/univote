import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card({ children }) {
  return (
    <View style={styles.card}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 336,
    backgroundColor: '#878FFF66',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9154F8',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});