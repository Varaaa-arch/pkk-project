import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/cartContext';

export default function PaymentScreen({ navigation }: any) {
  const [method, setMethod] = useState<string | null>(null);
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  // State modal notifikasi promo
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  // State modal alert pilih metode pembayaran
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);

  const { total, clearCart } = useCart();

  const paymentMethods = [
    { id: 'Cash', icon: require('../asset/donut/cash.webp') },
    { id: 'QRIS', icon: require('../asset/donut/qrisss.webp') },
  ];

  const applyPromo = () => {
    const validCodes = ['HAIANXIETY', 'XIRPL'];
    if (validCodes.includes(promo.toUpperCase())) {
      setDiscount(0.1);
      setModalSuccess(true);
      setModalMessage('Kode promo berhasil dipakai');
      setModalVisible(true);
    } else {
      setDiscount(0);
      setModalSuccess(false);
      setModalMessage('Kode promo tidak valid');
      setModalVisible(true);
    }
  };

  const handlePayment = () => {
    if (!method) {
      setShowPaymentAlert(true);
      return;
    }
    clearCart();
    navigation.replace('Success', { queueNumber: Math.floor(Math.random() * 900) + 100 });
  };

  const finalTotal = total - total * discount;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Metode Pembayaran</Text>

        {/* Pilihan metode pembayaran */}
        {paymentMethods.map((m) => (
          <TouchableOpacity
            key={m.id}
            style={[styles.method, method === m.id && styles.selected]}
            onPress={() => setMethod(m.id)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={m.icon} style={styles.icon} />
              <Text style={styles.methodText}>{m.id}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Kode Promo */}
        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Kode Promo"
            value={promo}
            onChangeText={setPromo}
          />
          <TouchableOpacity style={styles.applyBtn} onPress={applyPromo}>
            <Text style={{ color: '#111', fontWeight: 'bold' }}>Pakai</Text>
          </TouchableOpacity>
        </View>

        {/* Total */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text>Harga Donat</Text>
            <Text>Rp {total.toLocaleString()}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.summaryRow}>
              <Text>Diskon</Text>
              <Text>- Rp {(total * discount).toLocaleString()}</Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={{ fontWeight: 'bold' }}>Total</Text>
            <Text style={{ fontWeight: 'bold' }}>Rp {finalTotal.toLocaleString()}</Text>
          </View>
        </View>

        {/* Tombol Bayar */}
        <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
          <Text style={{ color: '#111', fontWeight: 'bold', fontSize: 16 }}>Bayar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal Notifikasi Promo */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={[styles.modalTitle, { color: modalSuccess ? 'green' : 'red' }]}>
              {modalSuccess ? 'Berhasil' : 'Gagal'}
            </Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Alert Pilih Metode Pembayaran */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showPaymentAlert}
        onRequestClose={() => setShowPaymentAlert(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={[styles.modalTitle, { color: 'red' }]}>Peringatan</Text>
            <Text style={styles.modalMessage}>Pilih metode pembayaran terlebih dahulu</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowPaymentAlert(false)}
            >
              <Text style={styles.modalButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    paddingTop: 30, 
    backgroundColor: '#f8f8f8', 
    flexGrow: 1 
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  method: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  selected: { borderColor: '#ffcc00', backgroundColor: '#f1f0ff' },
  icon: { width: 32, height: 32, marginRight: 12, resizeMode: 'contain' },
  methodText: { fontSize: 16 },
  promoContainer: { flexDirection: 'row', marginTop: 20, marginBottom: 20 },
  promoInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  applyBtn: {
    backgroundColor: '#ffcc00',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  summary: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  payBtn: {
    backgroundColor: '#ffcc00',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  // Modal styles
  modalBackground: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  modalButtonText: {
    fontWeight: 'bold',
    color: '#111',
  },
});
