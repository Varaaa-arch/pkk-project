import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function OrderSuccessScreen({ route, navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Successful!</Text>
      <Text style={styles.queue}>Your Queue Number</Text>
      <Text style={styles.number}>{route.params.queueNumber}</Text>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Shop')}>
        <Text style={{ color: '#fff' }}>Back to Shop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold' },
  queue: { fontSize: 16, marginTop: 10 },
  number: { fontSize: 48, fontWeight: 'bold', marginVertical: 20, color: '#27ae60' },
  backBtn: { backgroundColor: '#2980b9', padding: 12, borderRadius: 8, marginTop: 20 },
});
