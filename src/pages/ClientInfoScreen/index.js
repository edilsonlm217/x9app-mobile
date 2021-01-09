import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ClientInfoScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  function handleNextPage() {
    if (name !== '' && phone !== '', email !== '') {
      navigation.navigate('ClientAddressScreen', {
        name,
        phone,
        email,
      });
    } else {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
    }
  }

  return (
    <View style={styles.page_container}>

      <View style={styles.input_container}>
        <Icon name="account" size={22} color="#555555" />
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Nome do aluno"
          style={styles.input_style}
        />
      </View>

      <View style={styles.input_container}>
        <Icon name="phone" size={22} color="#555555" />
        <TextInput
          value={phone}
          onChangeText={text => setPhone(text)}
          placeholder="Telefone celular"
          style={styles.input_style}
        />
      </View>

      <View style={styles.input_container}>
        <Icon name="email" size={22} color="#555555" />
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="E-mail"
          style={styles.input_style}
        />
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
    paddingLeft: 10,
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