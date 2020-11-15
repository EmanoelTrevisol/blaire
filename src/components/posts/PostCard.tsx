import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { Container } from './styles';

const Detail = (props) => {
  const { title, body, username, createdAt } = props;

  return (
    <View style={stl.card}>
      <View style={stl.header}>
        <View style={stl.headerTitle}>
          <Text style={stl.headerTitleText}>{title}</Text>
          <Text style={stl.headetTitleSubText}>{createdAt}</Text>
        </View>
        <View style={stl.headarSub}>
          <Text style={stl.headerSubText}>{username}</Text>
        </View>
      </View>
      <View style={stl.body}>
        <Text>{body}</Text>
      </View>
    </View>
  );
};

const stl = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  header: {
    padding: 15,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    maxWidth: '60%',
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  headetTitleSubText: {
    fontSize: 12,
    color: '#444',
  },
  headarSub: {
    maxWidth: '35%',
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSubText: {
    textAlign: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  body: {
    padding: 15,
  },
});

export default Detail;
