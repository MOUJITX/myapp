import { StyleSheet, Switch, View } from 'react-native';

import { Props as CellProps } from './Cell';
import Cell from './Cell';

interface Props extends CellProps {
  value?: boolean;
  onValueChange: (value: boolean) => void;
}

export default (props: Props) => {
  return (
    <Cell {...props}>
      <View style={styles.container}>
        <Switch value={props.value} onValueChange={props.onValueChange} />
      </View>
    </Cell>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center',
  },
});
