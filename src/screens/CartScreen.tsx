import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/cartContext';

export default function CartScreen({ navigation }: any) {
  const { cart, updateQuantity, removeFromCart, total } = useCart();

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item.name}</Text>
                <View style={styles.qty}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
                <Text>Rp {(item.price * item.quantity).toLocaleString()}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={{ color: 'red' }}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.total}>Total: Rp {total.toLocaleString()}</Text>
          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => navigation.navigate('Payment')}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Proceed to Payment</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 },
  qty: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  payBtn: { backgroundColor: '#27ae60', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
});
