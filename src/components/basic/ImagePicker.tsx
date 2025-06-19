import { t } from 'i18next';
import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNFS from 'react-native-fs';
import {
  Asset as ImageAsset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import { localFileFolder } from '../../environment';
import { commonStyles } from '../../styles';
import { ossUpload } from '../../utils/oss';
import { randomUUID } from '../../utils/utils';

import BottomSheet, { BottomSheetRef } from './BottomSheet';
import CellGroup from './CellGroup';
import Divider from './Divider';

interface Props {
  children: React.ReactNode;
  source: 'camera' | 'library' | 'mixed';
  upload?: boolean;
  folder?: string;
  onImageChange: (imgUri: string) => void;
  onUploadSuccess?: (imgUri: string) => void;
  onUploadFailed?: (imgUri: string) => void;
}

const SelectSource = ({
  handleChooseImage,
  handleTakePhoto,
  handleClose,
}: {
  handleChooseImage: () => void;
  handleTakePhoto: () => void;
  handleClose: () => void;
}) => (
  <>
    <CellGroup noSpacing>
      <TouchableOpacity onPress={handleChooseImage} style={styles.selectButton}>
        <Text style={styles.text}>
          {t('component.imagePicker.chooseImage')}
        </Text>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity onPress={handleTakePhoto} style={styles.selectButton}>
        <Text style={styles.text}>{t('component.imagePicker.takePhoto')}</Text>
      </TouchableOpacity>
    </CellGroup>
    <View style={styles.breakLine} />
    <CellGroup noSpacing>
      <TouchableOpacity onPress={handleClose} style={styles.selectButton}>
        <Text style={[styles.text, styles.cancelText]}>
          {t('common.cancel.label')}
        </Text>
      </TouchableOpacity>
    </CellGroup>
  </>
);

const ImagePicker = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

  const saveImage = (img: ImageAsset) => {
    const imageName = randomUUID();
    const imgUri = img.uri;
    console.log('img', img);

    imgUri &&
      RNFS.copyFile(imgUri, localFileFolder + imageName)
        .then(() => {
          props.onImageChange(imageName);
          bottomSheetRef.current?.closeBottomSheet();
          props.upload &&
            ossUpload(imageName, imgUri, img.type, props.folder)
              .then(() => {
                // console.warn('upload success');
                props.onUploadSuccess && props.onUploadSuccess(imageName);
              })
              .catch(err => {
                console.error('upload error', err);
                props.onUploadFailed && props.onUploadFailed(imageName);
              });
        })
        .catch(_err => {
          // console.log('Error saving image', err);
        });
  };

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        // console.log('Image picker error: ', response.errorMessage);
      } else {
        const imgAsset = response.assets?.[0];
        // console.log('imgAsset', imgAsset);
        if (imgAsset) {
          saveImage(imgAsset);
        }
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        // console.log('User cancelled camera');
      } else if (response.errorMessage) {
        // console.log('Camera error: ', response.errorMessage);
      } else {
        const imgAsset = response.assets?.[0];
        // console.log('imgAsset', imgAsset);
        if (imgAsset) {
          saveImage(imgAsset);
        }
      }
    });
  };

  const openImagePicker = () => {
    props.source === 'camera' && handleTakePhoto();
    props.source === 'library' && handleChooseImage();
    props.source === 'mixed' && bottomSheetRef.current?.openBottomSheet();
  };

  return (
    <View onTouchEnd={openImagePicker}>
      {props.children}
      <BottomSheet
        ref={bottomSheetRef}
        children={
          <SelectSource
            handleChooseImage={handleChooseImage}
            handleTakePhoto={handleTakePhoto}
            handleClose={() => bottomSheetRef.current?.closeBottomSheet()}
          />
        }
        autoSize
        hideHeader
      />
    </View>
  );
};

const styles = StyleSheet.create({
  breakLine: {
    height: commonStyles.spacings.smallX,
  },
  cancelText: {
    color: commonStyles.color.red,
  },
  selectButton: {
    alignItems: 'center',
    borderColor: commonStyles.color.alpha0,
    borderWidth: 1,
    fontSize: 20,
  },
  text: {
    fontSize: commonStyles.fontSize.large,
  },
});

export default ImagePicker;
