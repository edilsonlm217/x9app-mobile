import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert, FlatList } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

export default function SearchScreen() {
  const windowHeight = Dimensions.get('window').height * 0.19;

  const [searchResult, setSearchResult] = useState([]);
  const [noContent, setNoContent] = useState(false);

  const [loading, setLoading] = useState(false);

  async function fetchClients() {
    try {
      setLoading(true);

      const response = await api.get('clients/all');

      setSearchResult(response.data);
      setLoading(false);
    } catch {
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível carregar seus alunos');
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

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

      <View style={styles.section_container}>
        <View style={styles.flatlist_container} >
          <FlatList
            data={searchResult}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
              <View style={styles.separator_style} />
            )}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.search_result_btn}>
                <Text>{item.name}</Text>
                <MIcon name="chevron-right" size={22} color="#222222" />
              </TouchableOpacity>
            )}
            refreshing={loading}
            onRefresh={() => fetchClients()}
          />
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
  search_result_btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },

  separator_style: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#CBCBCB'
  },

  flatlist_container: {
    borderRadius: 5,
    borderColor: '#707070',
    borderWidth: StyleSheet.hairlineWidth,
    marginLeft: 15,
    marginRight: 15,
  },

  section_container: {
    backgroundColor: '#F7F7F7',
    flex: 1,
    paddingTop: 30,
  },
});