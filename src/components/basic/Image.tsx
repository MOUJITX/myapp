import React, { useState } from 'react';
import { Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { commonStyles, ImageSize } from '../../styles';
import Popup from './Popup';
import { t } from 'i18next';

export interface Props {
  img: string;
  size: ImageSize;
  radius?: boolean;
  onPress?: () => void;
  preview?: boolean;
  onRemove?: () => void;
}

export default (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handlePress = () => {
    if (props.onPress) {
      props.onPress();
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        disabled={!props.preview || !props.img}
        onLongPress={() => props.onRemove && setDeleteConfirm(true)}
      >
        <Image
          source={{ uri: props.img }}
          style={{
            width: commonStyles.imageSize[props.size],
            height: commonStyles.imageSize[props.size],
            borderRadius: props.radius ? commonStyles.radius.medium : undefined,
          }}
        />
      </TouchableOpacity>

      <Modal
        transparent
        statusBarTranslucent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={styles.modalBackdrop}
        >
          <Image
            source={{ uri: props.img }}
            style={[styles.fullScreenImage]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>

      <Popup
        visible={deleteConfirm}
        title={t('component.imagePicker.removeConfirm.title')}
        content={t('component.imagePicker.removeConfirm.content')}
        buttons={[
          {
            label: t('common.confirm.label'),
            onPress: () => props.onRemove && props.onRemove(),
            type: 'danger',
          },
          {
            label: t('common.cancel.label'),
            onPress: () => setDeleteConfirm(false),
            type: 'default',
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    backgroundColor: commonStyles.backgroundColor.backDropWithOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});
