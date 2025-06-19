import React from 'react';
import { StyleSheet, View } from 'react-native';

import { commonStyles } from '../../styles';

import Button, { ButtonShapeType } from './Button';

interface Props {
  onPress?: () => void;
  label: string;
}

export default (props: Props) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={props.onPress}
        label={props.label}
        size="large"
        type="primary"
        shape={ButtonShapeType.Circle}
        shadow
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: commonStyles.spacings.large3X,
    position: 'absolute',
    right: commonStyles.spacings.large2X,
  },
});
