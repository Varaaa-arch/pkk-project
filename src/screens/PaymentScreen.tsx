import React from 'react';
import { View, Text, Button } from 'react-native';

const PaymentScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Choose Payment Method:</Text>
      <Button title="Pay with QRIS" onPress={() => navigation.navigate('Success')} />
      <Button title="Pay with Cash" onPress={() => navigation.navigate('Success')} />
    </View>
  );
};

export default PaymentScreen;
