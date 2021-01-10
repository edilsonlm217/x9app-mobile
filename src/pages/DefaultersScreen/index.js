import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import MIcon from 'react-native-vector-icons/MaterialIcons';

export default function DefaultersScreen() {
  const windowHeight = Dimensions.get('window').height * 0.19;

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <View style={styles.page_container}>
      <View style={[styles.page_header, { height: windowHeight }]}>
        <Text style={styles.header_label}>Alunos em atraso</Text>
      </View>

      <ScrollView style={{ margin: 10, marginTop: -30 }}>

        {data.map(item => (
          <TouchableOpacity key={item} style={styles.card_style}>
            <View style={styles.content_container}>
              <UserAvatar size={40} name="Avishay Bar" />
              <View style={styles.text_container}>
                <Text style={styles.main_line}>Edilson Rocha Lima</Text>
                <Text style={styles.sub_line}>2 mensalidades vencidas</Text>
              </View>
            </View>
            <MIcon name="chevron-right" size={22} color="#222222" />
          </TouchableOpacity>
        ))}
      </ScrollView>
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