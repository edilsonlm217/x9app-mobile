import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Alert, FlatList, Image } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import no_content from '../../assets/no_content.jpg';

export default function SearchScreen() {
  const windowHeight = Dimensions.get('window').height * 0.19;

  const [searchResult, setSearchResult] = useState([]);
  const [noContent, setNoContent] = useState(false);
  const [searchTerm, SetsearchTerm] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => { searchTerm === '' ? fetchClients() : null }, [searchTerm]);
  useEffect(() => { fetchClients(); }, []);

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

  async function handleSearching() {
    if (searchTerm !== '') {
      try {
        setLoading(true);

        const response = await api.get(`search?search_term=${searchTerm}`);

        if (response.data.length !== 0) {
          setSearchResult(response.data);
          setLoading(false);
        } else {
          setSearchResult(response.data);
          setNoContent(true);
          setLoading(false);
        }

      } catch (err) {
        console.log(err);
        setLoading(false);
        Alert.alert('Erro', 'Não foi possível buscar!');
      }
    } else {
      Alert.alert('Ops...', 'Informe algo antes de pesquisar');
    }


  }

  function handlePullToRefresh() {
    if (searchTerm !== '') {
      handleSearching();
    } else {
      fetchClients();
    }
  }

  function clearSearchTerm() {
    SetsearchTerm('');
    setNoContent(false);
  }

  return (
    <View style={styles.page_container}>
      <View style={[styles.page_header, { height: windowHeight }]}>
        <Text style={styles.header_label}>Meus alunos</Text>
      </View>

      <View style={styles.search_bar_container}>
        <View style={styles.search_bar}>
          <TextInput
            value={searchTerm}
            onChangeText={text => SetsearchTerm(text)}
            placeholder="Buscar por"
            style={styles.text_input}
          />

          {searchTerm !== ''
            &&
            <TouchableOpacity onPress={() => clearSearchTerm()} style={{ alignSelf: 'center', marginRight: 15 }}>
              <MIcon name="close" size={16} color="#000" />
            </TouchableOpacity>
          }

          <TouchableOpacity onPress={() => handleSearching()} style={styles.search_btn}>
            <MIcon name="search" size={22} color="#F7F7F7" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section_container}>
        {noContent
          ?
          <>
            <Image source={no_content} style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 60 }} />
            <Text style={{ alignSelf: 'center', fontFamily: 'Roboto-Light', marginTop: 10 }}>
              Nenhum resultado encontrado
            </Text>
          </>
          :
          <View style={styles.flatlist_container}>
            <FlatList
              data={searchResult}
              keyExtractor={item => item.name}
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
              onRefresh={() => handlePullToRefresh()}
            />
          </View>
        }
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