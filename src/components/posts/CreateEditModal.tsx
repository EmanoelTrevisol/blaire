import React from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Post } from '@models/Post';
import PostForm from './PostForm';

export interface IProps {
  onSubmit: ({ title, body }: { title: string; body: string }) => Promise<void>;
  isSubmitting: boolean;
  close: () => void;
  title: string;
  buttonTitle: string;
  visible: boolean;
  post: Post | null;
  isCreate?: boolean;
}

const CreateEditModal = (props: IProps) => {
  const {
    onSubmit,
    close,
    title,
    buttonTitle,
    visible,
    post,
    isSubmitting,
    isCreate,
  } = props;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={stl.modal}>
        <View style={stl.modalHeader}>
          <Text style={stl.modalTitle}>{title}</Text>
          <TouchableOpacity style={stl.modalCloseButton} onPress={close}>
            <Icon style={stl.modalCloseButtonIcon} name="times" />
          </TouchableOpacity>
        </View>
        <View style={stl.modalBody}>
          <PostForm
            isCreate={isCreate}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            buttonTitle={buttonTitle}
            post={post}
          />
        </View>
      </View>
    </Modal>
  );
};

const stl = StyleSheet.create({
  modal: {
    marginTop: '30%',
    padding: 10,
    backgroundColor: '#fff',
    flex: 1,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBody: {
    // flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalCloseButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modalCloseButtonIcon: {
    fontSize: 20,
    right: 0,
    marginRight: 0,
  },
});

export default CreateEditModal;
