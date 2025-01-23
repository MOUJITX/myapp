const color = {
  alpha0: '#00000000',
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
  green: '#4CAF50',
  greenLight: '#4CAF5015',
  blue: '#1989fa',
  orange: '#ff976a',
  orangeDark: '#ed6a0c',
  orangeLight: '#fffbe8',
  red: '#F44336',
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

const backgroundColor = {
  success: color.greenLight,
};

const fontSize = {
  small2X: 8,
  smallX: 10,
  small: 12,
  medium: 14,
  large: 16,
  largeX: 18,
  large2X: 20,
  large3X: 24,
};

const imageSize = {
  small2X: 16,
  smallX: 24,
  small: 32,
  medium: 48,
  large: 64,
  largeX: 96,
  large2X: 128,
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
  large3X: 40,
};

const lineHeight = {
  smallX: 14,
  small: 18,
  medium: 20,
  large: 22,
  largeX: 24,
};

const radius = {
  small: 4,
  medium: 10,
  circle: '100%',
};

const shadow = {
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
};

const textSize = {
  h1: { fontSize: fontSize.large3X, fontWeight: 'bold' },
  h2: { fontSize: fontSize.large2X, fontWeight: 'bold' },
  h3: {
    fontSize: fontSize.largeX,
    fontWeight: 'bold',
    lineHeight: lineHeight.largeX,
  },
  h4: { fontSize: fontSize.large },
  h5: { fontSize: fontSize.medium },
  h6: { fontSize: fontSize.small },
  h7: { fontSize: fontSize.smallX },
  h8: { fontSize: fontSize.small2X },
};
export type TextSize = keyof typeof textSize;

const buttonSize = {
  small: 24,
  medium: 40,
  large: 56,
};
export type ButtonSize = keyof typeof buttonSize;

export const commonStyles = {
  color,
  textColor,
  statusColor,
  backgroundColor,
  fontSize,
  textSize,
  imageSize,
  spacings,
  lineHeight,
  radius,
  shadow,
  buttonSize,
};
