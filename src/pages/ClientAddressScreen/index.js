import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function ClientAddressScreen({ navigation, route }) {
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  function handleNextPage() {
    const { name, phone, email } = route.params;

    if (street !== '' && number !== '' && neighborhood !== '') {
      navigation.navigate('ClientEnrollmentScreen', {
        name,
        phone,
        email,
        street,
        number,
        neighborhood,
      });
    } else {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
    }
  }

  return (
    <View style={styles.page_container}>

      <View style={styles.input_container}>
        <TextInput
          value={street}
          onChangeText={text => setStreet(text)}
          placeholder="Logradouro"
          style={styles.input_style}
        />
      </View>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <View style={{ backgroundColor: '#FFFFFF', width: 100, borderRadius: 5, paddingLeft: 10, marginRight: 10 }}>
          <TextInput
            value={number}
            onChangeText={text => setNumber(text)}
            placeholder="Número"
          />
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 5, paddingLeft: 10, flex: 1 }}>
          <TextInput
            value={neighborhood}
            onChangeText={text => setNeighborhood(text)}
            placeholder="Bairro"
          />
        </View>
      </View>

      <TouchableOpacity onPress={() => handleNextPage()} style={styles.next_btn}>
        <Text style={styles.next_btn_label}>Próximo</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  page_container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingLeft: 15,
    paddingRight: 15,
  },

  input_container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderRadius: 5,
    marginTop: 20,
  },

  input_style: {
    flex: 1,
  },

  next_btn: {
    backgroundColor: '#F43C08',
    position: 'absolute',
    right: 20,
    bottom: 20,
    height: 45,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  next_btn_label: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    color: '#F7F7F7'
  },
});