import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, Modal, StyleSheet, View } from 'react-native';
import { commonStyles, ImageSize } from '../../styles';
import Popup from './Popup';
import { t } from 'i18next';
import { localFileFolder, ossDomain } from '../../environment';
import RNFS from 'react-native-fs';

export interface Props {
  img: string;
  size: ImageSize;
  radius?: boolean;
  onPress?: () => void;
  preview?: boolean;
  onRemove?: () => void;
  isWaiting?: boolean;
  folder?: string;
}

export default (props: Props) => {
  const [visible, setVisible] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [uri, setUri] = useState<string>();

  const handlePress = () => {
    if (props.onPress) {
      props.onPress();
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    if (props.img) {
      const localURI = localFileFolder + props.img;
      RNFS.exists(localURI)
        .then(exist => {
          setUri(
            exist
              ? localURI
              : ossDomain + `${props.folder ?? 'default'}` + '/' + props.img
          );
        })
        .catch(e => {
          console.error('check file exist error', e);
          setUri(undefined);
        });
    } else {
      setUri(undefined);
    }
  }, [props.folder, props.img]);

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        disabled={!props.preview || !uri}
        onLongPress={() => props.onRemove && setDeleteConfirm(true)}
      >
        <Image
          source={uri ? { uri } : undefined}
          style={{
            width: commonStyles.imageSize[props.size],
            height: commonStyles.imageSize[props.size],
            borderRadius: props.radius ? commonStyles.radius.medium : undefined,
          }}
        />
        {props.isWaiting && (
          <View
            style={[
              styles.waitingMask,
              {
                borderRadius: props.radius
                  ? commonStyles.radius.medium
                  : undefined,
              },
            ]}
          />
        )}
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
            source={uri ? { uri } : undefined}
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
            onPress: () => {
              props.onRemove && props.onRemove();
              setDeleteConfirm(false);
            },
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
  waitingMask: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: commonStyles.backgroundColor.backDropWithOpacity,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
