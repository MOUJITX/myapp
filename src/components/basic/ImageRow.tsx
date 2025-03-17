import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from './Image';
import { commonStyles, ImageSize } from '../../styles';
import ImagePicker from './ImagePicker';

interface Props {
  imgs: string[];
  size: ImageSize;
  radius?: boolean;
  disabled?: boolean;
  upload?: boolean;
  folder?: string;
  onValueChange?: (imgs: string[]) => void;
}

export default (props: Props) => {
  const [waitingImgs, setWaitingImgs] = useState<string[]>([]);

  return (
    <View style={styles(props).container}>
      {props.imgs.map((img, index) => (
        <Image
          img={img}
          size={props.size}
          radius={props.radius}
          key={index}
          preview
          onRemove={() => {
            props.onValueChange?.(props.imgs.filter((_, i) => i !== index));
          }}
          isWaiting={waitingImgs.includes(img)}
          folder={props.folder}
        />
      ))}
      {!props.disabled && (
        <ImagePicker
          upload={props.upload}
          children={
            <View style={styles(props).addButton}>
              <Text style={styles(props).addButtonText}>+</Text>
            </View>
          }
          source={'mixed'}
          folder={props.folder}
          onImageChange={newImg => {
            props.onValueChange?.([...props.imgs, newImg]);
            props.upload && setWaitingImgs([...waitingImgs, newImg]);
          }}
          onUploadSuccess={img =>
            props.upload && setWaitingImgs(waitingImgs.filter(i => i !== img))
          }
          onUploadFailed={img => {
            props.onValueChange?.(props.imgs.filter(i => i !== img));
            props.upload && setWaitingImgs(waitingImgs.filter(i => i !== img));
          }}
        />
      )}
    </View>
  );
};

const styles = (props: Props) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: commonStyles.spacings.smallX,
      flexWrap: 'wrap',
    },
    addButton: {
      width: commonStyles.imageSize[props.size],
      height: commonStyles.imageSize[props.size],
      borderRadius: props.radius ? commonStyles.radius.medium : undefined,
      backgroundColor: commonStyles.color.gray2,
      borderWidth: 1,
      borderColor: commonStyles.color.gray4,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      fontSize: commonStyles.fontSize.large4X,
      color: commonStyles.color.gray6,
      fontWeight: '300',
    },
  });
