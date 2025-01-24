import React, { useState } from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { randomUUID } from '../../utils/utils';

const ImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const saveImage = (imgUri: string) => {
    const path = `${RNFS.DocumentDirectoryPath}/${randomUUID()}`;
    RNFS.copyFile(imgUri, path)
      .then(() => {
        console.log('Image saved to', path);
      })
      .catch(err => {
        console.log('Error saving image', err);
      });
  };

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        const imgAsset = response.assets?.[0];
        console.log('imgAsset', imgAsset);
        if (imgAsset?.uri) {
          setImageUri(imgAsset.uri);
          saveImage(imgAsset.uri);
        }
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera error: ', response.errorMessage);
      } else {
        const imgAsset = response.assets?.[0];
        console.log('imgAsset', imgAsset);
        if (imgAsset?.uri) {
          setImageUri(imgAsset.uri);
          saveImage(imgAsset.uri);
        }
      }
    });
  };

  return (
    <View style={styles.container} onTouchEnd={() => console.log('touchEnd')}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Choose Image" onPress={handleChooseImage} />
      <Button title="Take Photo" onPress={handleTakePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});

export default ImagePicker;
