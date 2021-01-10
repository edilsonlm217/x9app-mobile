import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert, RefreshControl } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

export default function DefaultersScreen() {
  const windowHeight = Dimensions.get('window').height * 0.19;

  const [loading, setLoading] = useState(false);
  const [defaulters, setDefaulters] = useState([]);

  useEffect(() => { fetchDefaulters() }, []);

  async function fetchDefaulters() {
    const today = new Date().setUTCHours(0);

    try {
      setLoading(true);

      const response = await api.get(`defaulters?today=${today.toString()}`);

      setDefaulters(response.data);
      setLoading(false);
    } catch {
      setLoading(false);
      Alert.alert('Ops...', 'Não foi possível carregar. Tente novamente!');
    }
  }

  return (
    <View style={styles.page_container}>
      <View style={[styles.page_header, { height: windowHeight }]}>
        <Text style={styles.header_label}>Alunos em atraso</Text>
      </View>

      <ScrollView
        style={{ margin: 10, marginTop: -30 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => fetchDefaulters()} />
        }
      >
        {defaulters.map(item => (
          <TouchableOpacity key={item.id} style={styles.card_style}>
            <View style={styles.content_container}>
              <UserAvatar size={40} name={item.name} />
              <View style={styles.text_container}>
                <Text style={styles.main_line}>{item.name}</Text>
                <Text style={styles.sub_line}>
                  {item.overdue_invoice_count > 1
                    ? `${item.overdue_invoice_count} mensalidades vencidas`
                    : `${item.overdue_invoice_count} mensalidade vencida`
                  }
                </Text>
              </View>
            </View>
            <MIcon name="chevron-right" size={22} color="#222222" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View >
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

  card_style: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },

  main_line: { fontFamily: 'Roboto-Bold', fontSize: 14 },

  sub_line: { fontFamily: 'Roboto-Light', fontSize: 12 },

  text_container: { marginLeft: 15 },

  content_container: { flexDirection: 'row', alignItems: 'center' },
});