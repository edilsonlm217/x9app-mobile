import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

import logo from '../../assets/x9logo.png';
import { store } from '../../store/store';

export default function LoginScreen() {
  const globalStore = useContext(store);

  const { signIn } = globalStore.methods;

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  async function handleSignIn() {
    if (login !== '' && password !== '') {
      setIsVisible(true);

      const isDone = await signIn({
        login,
        password,
      });

      if (isDone) {
        setIsVisible(false);
      }
    } else {
      Alert.alert('Erro', 'Por favor informe todos os campos');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content_container}>
        <Image source={logo} />

        <View style={[styles.input_container, { marginTop: 40 }]}>
          <Icon name="account" size={22} color="#555555" />
          <TextInput
            placeholder="Login"
            style={styles.text_input}
            value={login}
            onChangeText={(text) => setLogin(text)}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        <View style={[styles.input_container, { marginTop: 20 }]}>
          <Icon name="lock" size={22} color="#555555" />
          <TextInput
            placeholder="Senha"
            style={styles.text_input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.btn_container}>
          <TouchableOpacity
            style={styles.auth_btn}
            onPress={() => handleSignIn()}
          >
            <Text style={styles.auth_btn_label}>AUTENTICAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        isVisible={isVisible}
        style={{ margin: 0 }}
        animationInTiming={500}
        animationOutTiming={500}
        useNativeDriver
      >
        <View
          style={styles.modal_style}
        >
          <ActivityIndicator size="small" color="#0000ff" />
          <Text
            style={{ fontSize: 16, textAlign: 'center', marginBottom: 10 }}
          >
            Carregando...
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },

  content_container: {
    alignItems: 'center',
  },

  input_container: {
    backgroundColor: '#FFFFFF',
    height: 45,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },

  text_input: {
    flex: 1,
    padding: 0,
    height: '100%',
    paddingLeft: 10
  },

  auth_btn: {
    backgroundColor: '#F43C08',
    flex: 1,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  btn_container: {
    marginTop: 20,
    flexDirection: 'row',
  },

  auth_btn_label: {
    color: '#F7F7F7',
    fontFamily: 'Roboto-Bold',
  },

  modal_style: {
    width: 300,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 5,
    padding: 20,
    paddingTop: 10,
  },
});