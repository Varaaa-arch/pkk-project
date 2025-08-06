import React from 'react';
import { View, Text, Button } from 'react-native';

const CartScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Your Cart Items</Text>
      {/* List item cart di sini */}
      <Button title="Proceed to Payment" onPress={() => navigation.navigate('Payment')} />
    </View>
  );
};

export default CartScreen;
