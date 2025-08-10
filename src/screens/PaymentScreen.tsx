import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/cartContext';

export default function PaymentScreen({ navigation }: any) {
  const [method, setMethod] = useState<string | null>(null);
  const { total, clearCart } = useCart();

  const handlePayment = () => {
    if (!method) return alert('Select payment method');
    clearCart();
    navigation.replace('Success', { queueNumber: Math.floor(Math.random() * 900) + 100 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>
      {['Cash', 'QRIS', 'Debit Card'].map((m) => (
        <TouchableOpacity
          key={m}
          style={[styles.method, method === m && styles.selected]}
          onPress={() => setMethod(m)}
        >
          <Text>{m}</Text>
        </TouchableOpacity>
      ))}
      <Text style={{ marginTop: 20 }}>Total: Rp {total.toLocaleString()}</Text>
      <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
        <Text style={{ color: '#fff' }}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  method: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  selected: { borderColor: '#27ae60', backgroundColor: '#ecf0f1' },
  payBtn: { backgroundColor: '#27ae60', padding: 12, borderRadius: 8, marginTop: 20, alignItems: 'center' },
});
