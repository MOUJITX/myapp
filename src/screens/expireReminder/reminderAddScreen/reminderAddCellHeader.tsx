import { t } from 'i18next';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';

import Button, { ButtonShapeType } from '../../../components/basic/Button';
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
          shape={ButtonShapeType.Square}
        />
        <Button
          label="-"
          plain
          type="danger"
          onPress={props.onDelete}
          size="small"
          shape={ButtonShapeType.Square}
          pressConfirm={{
            title: t('common.delete.confirm.title'),
            description: t('common.delete.confirm.description'),
          }}
        />
        <Button
          label="C"
          plain
          type="primary"
          onPress={props.onCopy}
          size="small"
          shape={ButtonShapeType.Square}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: commonStyles.spacings.small,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: commonStyles.fontSize.large2X,
    fontWeight: 'bold',
  },
});
