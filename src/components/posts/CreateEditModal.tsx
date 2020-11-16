import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { Post } from '../../models/Post';

export interface IProps {
  onSubmit: () => void;
  close: () => void;
  title: string;
  buttonTitle: string;
  visible: boolean;
  post: Post | null;
}

const CreateEditModal = (props: IProps) => {
  const { onSubmit, close, title, buttonTitle, visible, post } = props;

  return (
    <Modal>
      <View>
        <Text>Modal</Text>
      </View>
    </Modal>
  );
};

const stl = StyleSheet.create({});

export default CreateEditModal;
