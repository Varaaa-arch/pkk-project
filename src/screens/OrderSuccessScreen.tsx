import React from 'react';
import { View, Text, Button } from 'react-native';

const OrderSuccessScreen = ({ navigation }: any) => {
  const orderNumber = Math.floor(1000 + Math.random() * 9000);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Order Success!</Text>
      <Text>Your Queue Number:</Text>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{orderNumber}</Text>
      <Button title="Back to Shop" onPress={() => navigation.navigate('Shop')} />
    </View>
  );
};

export default OrderSuccessScreen;
