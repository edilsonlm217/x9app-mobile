import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import Dialog from 'react-native-dialog';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { store } from '../../store/store';

export default function Dashboard({ navigation }) {
  const globalStore = useContext(store);
  const { signOut } = globalStore.methods;

  const [isConfirmLogoutVisible, setIsConfirmLogoutVisible] = useState(false);

  async function handleLogout() {
    try {
      const keys = ['@auth_token', '@employee_id', '@server_ip', '@server_port'];
      await AsyncStorage.multiRemove(keys);

      signOut();
    } catch {
      Alert.alert('Erro', 'Falha ao deslogar. Tente novamente!');
    }
  }

  function handleNewClient() {
    navigation.navigate('ClientInfoScreen');
  }

  return (
    <View style={styles.page_container}>
      <StatusBar barStyle="light-content" backgroundColor="#F43C08" />
      <View style={styles.page_header}>
        <View>
          <Text style={styles.welcome_light}>Bem vindo,</Text>
          <Text style={styles.welcome_bold}>Rodrigo Nóbrega</Text>
        </View>
        <TouchableOpacity
          style={styles.exit_btn}
          onPress={() => setIsConfirmLogoutVisible(true)}
        >
          <Icon name="location-exit" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.floated_card}>
        <View style={styles.card_label_container}>
          <Text style={styles.card_label}>Balanço atual de Novembro</Text>
        </View>
        <View style={styles.card_money_container}>
          <Text style={styles.currency_style}>R$ </Text>
          <Text style={styles.money_style}>2.326,01</Text>
          <TouchableOpacity>
            <Icon name="eye-off" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content_container}>
        <Text style={styles.sub_header}>Informações da escolinha</Text>

        <View style={styles.card_container}>
          <View style={styles.card_icon_container}>
            <Icon name="account" size={22} color="#000000" />
          </View>
          <View style={styles.card_body_container}>
            <Text style={styles.card_main_text}>55</Text>
            <Text style={styles.card_sub_text}>Alunos Matriculados</Text>
          </View>
        </View>

        <View style={styles.card_container}>
          <View style={styles.card_icon_container}>
            <MIcon name="money-off" size={22} color="#000000" />
          </View>
          <View style={styles.card_body_container}>
            <Text style={styles.card_main_text}>32%</Text>
            <Text style={styles.card_sub_text}>Alunos Inadiplentes</Text>
          </View>
        </View>

        <View style={styles.card_container}>
          <View style={styles.card_icon_container}>
            <MIcon name="attach-money" size={22} color="#000000" />
          </View>
          <View style={styles.card_body_container_max_widthed}>
            <View style={styles.content_body}>
              <Text style={styles.card_main_text}>R$ 5.000,00</Text>
              <Text numberOfLines={1} style={styles.card_sub_text}>
                Faturamento esperado de Novembro
              </Text>
            </View>

            <TouchableOpacity>
              <Icon name="eye-off" size={22} color="#000" />
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.card_container}>
          <View style={styles.card_icon_container}>
            <MIcon name="money-off" size={22} color="#000000" />
          </View>
          <View style={styles.card_body_container_max_widthed}>
            <View style={styles.content_body}>
              <Text style={styles.card_main_text}>R$ 5.000,00</Text>
              <Text numberOfLines={1} style={styles.card_sub_text}>
                Faturamento em inadimplência de Novembro
              </Text>
            </View>

            <TouchableOpacity>
              <Icon name="eye-off" size={22} color="#000" />
            </TouchableOpacity>

          </View>
        </View>

      </View>

      <TouchableOpacity onPress={() => handleNewClient()} style={styles.new_client_btn}>
        <Text style={styles.new_client_btn_label}>CADASTRAR ALUNO</Text>
      </TouchableOpacity>

      <View>
        <Dialog.Container visible={isConfirmLogoutVisible}>
          <Dialog.Title>Sair do sistema</Dialog.Title>
          <Dialog.Description>
            Você realmente deseja deslogar do sistema?
            </Dialog.Description>
          <Dialog.Button
            label="Cancelar"
            onPress={() => setIsConfirmLogoutVisible(false)}
          />
          <Dialog.Button onPress={() => handleLogout()} label="Deslogar" />
        </Dialog.Container>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  page_container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  content_container: {
    marginTop: 55,
    marginLeft: 15,
    marginRight: 15,
  },

  page_header: {
    backgroundColor: '#F43C08',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },

  welcome_light: {
    fontFamily: 'Roboto-Light',
    color: '#FFFFFF'
  },

  welcome_bold: {
    fontFamily: 'Roboto-Bold',
    color: '#FFFFFF'
  },

  exit_btn: {
    height: 50,
    justifyContent: 'center'
  },

  floated_card: {
    position: 'absolute',

    top: '16%',
    width: '93%',
    left: '3.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },

  card_label_container: {
    width: '35%'
  },

  card_label: {
    fontFamily: 'Roboto-Light',
    fontSize: 12,
  },

  card_money_container: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  currency_style: {
    fontFamily: 'Roboto-Bold'
  },

  money_style: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    marginRight: 20
  },

  new_client_btn: {
    backgroundColor: '#F43C08',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 25,
    width: '93%',
    marginLeft: '3.5%',
    marginRight: '3.5%',
    height: 45,
    borderRadius: 5,
  },

  new_client_btn_label: {
    fontFamily: 'Roboto-Bold',
    color: '#F7F7F7',
  },

  sub_header: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    marginBottom: 10,
  },

  card_container: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
  },

  card_icon_container: {
    padding: 10,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card_body_container: {
    justifyContent: 'space-between',
  },

  card_main_text: {
    fontFamily: 'Roboto-Bold',
  },

  card_sub_text: {
    fontFamily: 'Roboto-Light',
    fontSize: 12,
  },

  card_body_container_max_widthed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },

  content_body: {
    justifyContent: 'space-between',
    maxWidth: '85%',
  },
});