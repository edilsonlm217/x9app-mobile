import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Alert, ToastAndroid } from 'react-native';
import { StackActions } from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

import api from '../../services/api';

export default function ClientEnrollmentScreen({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [payment, setPayment] = useState('');

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [isLoading, setIsloading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  async function handleNextPage() {
    const { name, phone, email, street, number, neighborhood, } = route.params;

    if (payment === '') {
      return Alert.alert('Erro', 'Todos os campos são obrigatórios');
      ;
    }

    try {
      setIsloading(true);

      await api.post('clients', {
        name,
        phone,
        email,
        street,
        number,
        neighborhood,
        due_date_day: date,
        monthly_payment: payment,
      });

      setIsloading(false);
      ToastAndroid.show("Salvo com sucesso", ToastAndroid.SHORT);
      navigation.dispatch(StackActions.popToTop());
    } catch {
      setIsloading(false);
      Alert.alert('Ops...', 'Não foi possível salvar este aluno no servidor');
    }
  }

  return (
    <View style={styles.page_container}>

      <TouchableOpacity
        onPress={showDatepicker}
        style={styles.input_container}
      >
        <Icon name="calendar" size={22} color="#555555" />
        <TextInput
          placeholder="Data de vencimento"
          style={styles.input_style}
          editable={false}
          value={date.toDateString()}
        />
      </TouchableOpacity>

      <View style={styles.input_container}>
        <MIcon name="attach-money" size={22} color="#555555" />
        <TextInput
          style={styles.input_style}
          placeholder="Valor da mensalidade"
          value={payment}
          onChangeText={text => setPayment(text)}
        />
      </View>

      <TouchableOpacity onPress={() => handleNextPage()} style={styles.next_btn}>
        <Text style={styles.next_btn_label}>Finalizar</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Spinner
        visible={isLoading}
        textContent={'Cadastrando...'}
        textStyle={styles.spinnerTextStyle}
      />
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

  spinnerTextStyle: {
    color: '#FFF'
  },
});