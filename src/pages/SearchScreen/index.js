import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SearchScreen() {
  const windowHeight = Dimensions.get('window').height * 0.19;

  return (
    <View style={styles.page_container}>
      <View style={[styles.page_header, { height: windowHeight }]}>
        <Text style={styles.header_label}>Buscar alunos</Text>
      </View>

      <View style={styles.search_bar_container}>
        <View style={styles.search_bar}>
          <TextInput placeholder="Buscar por" style={styles.text_input} />
          <TouchableOpacity style={styles.search_btn}>
            <MIcon name="search" size={22} color="#F7F7F7" />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#F7F7F7',
          flex: 1,
          paddingTop: 30,
        }}
      >
        <View style={{
          borderRadius: 5,
          borderColor: '#707070',
          borderWidth: StyleSheet.hairlineWidth,
          marginLeft: 15,
          marginRight: 15,
        }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
            }}
          >
            <Text>Edilson Rocha Lima</Text>
            <MIcon name="chevron-right" size={22} color="#222222" />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page_container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  page_header: {
    backgroundColor: '#F43C08',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },

  header_label: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    zIndex: 1,
  },

  search_bar_container: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: -20,
  },

  search_bar: {
    backgroundColor: '#F7F7F7',
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  text_input: {
    flex: 1,
    padding: 0,
    paddingLeft: 10,
  },

  search_btn: {
    backgroundColor: '#222222',
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});