import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';

import { RouteProp } from '../../navigation/AppNavigationList';

export const PageC = () => {
  const route = useRoute<RouteProp<'PageC'>>();
  const { initMsg } = route.params;

  return (
    <View>
      <Text>{initMsg}</Text>
    </View>
  );
};
