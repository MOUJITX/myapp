import { Dimensions } from 'react-native';

export const autoFontSize = (size: number, width?: number) => {
  const BASE_WIDTH = 370;
  const SCREEN_WIDTH = width ?? Dimensions.get('window').width;
  return Math.round((size * SCREEN_WIDTH) / BASE_WIDTH);
};
