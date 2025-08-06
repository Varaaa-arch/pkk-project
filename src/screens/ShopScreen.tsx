import React from 'react';
import { View, FlatList, Button } from 'react-native';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const ShopScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default ShopScreen;
