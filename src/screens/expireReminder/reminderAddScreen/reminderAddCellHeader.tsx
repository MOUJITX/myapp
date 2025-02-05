import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../../components/basic/Button';
import { Text } from 'react-native';
import { commonStyles } from '../../../styles';

interface Props {
  index: number;
  onDelete?: () => void;
  onCopy?: () => void;
  onAdd?: () => void;
}

export default (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`# ${props.index + 1}`}</Text>
      <View style={styles.buttonContainer}>
        <Button
          label="+"
          plain
          type="primary"
          onPress={props.onAdd}
          size="small"
          shape="square"
        />
        <Button
          label="-"
          plain
          type="danger"
          onPress={props.onDelete}
          size="small"
          shape="square"
        />
        <Button
          label="C"
          plain
          type="primary"
          onPress={props.onCopy}
          size="small"
          shape="square"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: commonStyles.fontSize.large2X,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: commonStyles.spacings.small,
  },
});
