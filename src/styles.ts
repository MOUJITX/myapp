const color = {
  white: '#ffffff',
  black: '#000000',
  gray1: '#f7f8fa',
  gray2: '#f2f3f5',
  gray3: '#ebedf0',
  gray4: '#dcdee0',
  gray5: '#c8c9cc',
  gray6: '#969799',
  gray7: '#646566',
  gray8: '#323233',
  red: '#ee0a24',
  blue: '#1989fa',
  orange: '#ff976a',
  orangeDark: '#ed6a0c',
  orangeLight: '#fffbe8',
  green: '#07c160',
};

const textColor = {
  info: color.gray6,
  default: color.gray8,
  primary: color.blue,
  success: color.green,
  danger: color.red,
  warning: color.orange,
};

const statusColor = {
  ...textColor,
};

const fontSize = {
  smallXX: 8,
  smallX: 10,
  small: 12,
  medium: 14,
  large: 16,
  largeX: 18,
  largeXX: 20,
};

const imageSize = {
  small2X: 16,
  smallX: 24,
  small: 32,
  medium: 48,
  large: 96,
  largeX: 128,
};

export type ImageSize = keyof typeof imageSize;

const spacings = {
  small2X: 4,
  smallX: 8,
  small: 12,
  medium: 16,
  large: 20,
  largeX: 24,
  large2X: 32,
};

const lineHeight = {
  smallX: 14,
  small: 18,
  medium: 20,
  large: 22,
  largeX: 24,
};

const radius = {
  medium: 10,
};

export const commonStyles = {
  color,
  textColor,
  statusColor,
  fontSize,
  imageSize,
  spacings,
  lineHeight,
  radius,
};
