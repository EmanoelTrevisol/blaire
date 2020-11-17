import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { simpleShow } from '@utils/Toaster';
import Colors from '@assets/colors';

const PostCard = (props) => {
  const {
    title,
    body,
    username,
    createdAt,
    onEditPress,
    showEditIcon,
    onDeletePress,
  } = props;

  const setFavorite = () => {
    simpleShow(
      'Ahh, infelizmente essa funcionalidade ainda não está disponível',
    );
  };

  return (
    <View style={stl.card}>
      <View style={stl.header}>
        {/* If showEditIcon, show edit button */}

        {(showEditIcon && (
          <TouchableOpacity style={stl.editIconTouchable} onPress={onEditPress}>
            <Icon style={stl.editIcon} name={'pencil-alt'} />
          </TouchableOpacity>
        )) ||
          null}

        {/* If showEditIcon, show delete */}
        {(showEditIcon && (
          <TouchableOpacity
            style={stl.favoriteIconTouchable}
            onPress={onDeletePress}
          >
            <Icon
              style={stl.favoriteIcon}
              name={'trash'}
              color={Colors.danger}
            />
          </TouchableOpacity>
        )) || (
          <TouchableOpacity
            style={stl.favoriteIconTouchable}
            onPress={setFavorite}
          >
            <Icon style={stl.favoriteIcon} name={'heart'} />
          </TouchableOpacity>
        )}

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
    backgroundColor: Colors.white,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 20,
    elevation: 10,
    shadowColor: Colors.black,
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  header: {
    padding: 15,
    borderBottomColor: Colors.dividerColor,
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
    color: Colors.secondaryText,
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
  favoriteIconTouchable: {
    position: 'absolute',
    top: 5,
    right: 15,
    padding: 5,
  },
  editIconTouchable: {
    position: 'absolute',
    top: 5,
    right: 40,
    padding: 5,
  },
  editIcon: {
    color: Colors.primaryLight,
  },
  favoriteIcon: {
    fontSize: 14,
    color: Colors.danger,
  },
  body: {
    padding: 15,
  },
});

export default PostCard;
