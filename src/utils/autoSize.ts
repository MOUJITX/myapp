import { Dimensions } from 'react-native';

export const autoFontSize = (size: number) => {
  const BASE_WIDTH = 370;
  const SCREEN_WIDTH = Dimensions.get('window').width;
  return Math.round((size * SCREEN_WIDTH) / BASE_WIDTH);
};
