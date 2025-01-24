import React from 'react';
import { StyleSheet, View } from 'react-native';
import { commonStyles } from '../../styles';
import Button from './Button';

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
        shape="circle"
        shadow
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: commonStyles.spacings.large2X,
    bottom: commonStyles.spacings.large3X,
  },
});
