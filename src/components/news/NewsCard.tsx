import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { INews } from '../../models/News';

const NewsCard = (props: INews) => {
  const { username, createdAt, profilePicture, message } = props;

  return (
    <View style={stl.card}>
      <View style={stl.header}>
        <Image style={stl.profilePicture} source={{ uri: profilePicture }} />
        <Text style={stl.username}>{username}</Text>
        <Text style={stl.createdAt}>{createdAt}</Text>
      </View>
      <View style={stl.body}>
        <Text style={stl.bodyText}>{message}</Text>
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
  },
  profilePicture: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
  },
  createdAt: {
    fontSize: 12,
    color: '#444',
  },
  body: {
    padding: 20,
    // paddingHorizontal: 20,
    // paddingVertical: 16,
  },
  bodyText: {
    fontSize: 16,
  },
});

export default NewsCard;
