import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/cartContext';

const menuItems = [
  { id: '1', name: 'Donat Gula', price: 3000, image: require('../asset/donut/gula.jpeg') },
  { id: '2', name: 'Donat Coklat', price: 3000, image: require('../asset/donut/coklat.jpeg') },
  { id: '3', name: 'Donat Strawberry', price: 3000, image: require('../asset/donut/strawberry.jpeg') },
];

export default function ShopScreen({ navigation }: any) {
  const { addToCart } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.btnText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.cartBtn}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.btnText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8, alignItems: 'center' },
  image: { width: 100, height: 100, resizeMode: 'contain' },
  name: { fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  price: { fontSize: 16, color: 'gray', marginVertical: 5 },
  button: { backgroundColor: '#2ecc71', padding: 8, borderRadius: 5 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  cartBtn: { backgroundColor: '#e67e22', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
});
