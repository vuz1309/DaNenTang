const common = {
  white: '#fff',
  white10: 'rgba(255, 255, 255, 0.1)',
  transparent: 'transparent',
  black: '#000',
  blue: 'blue',
  placeHolderGray: 'rgba(216, 216, 216, 0.6)',
  borderInputError: '#FF0000',
  green: 'green',
  grey: 'grey',
  // silverChalice: '#A0A0A0',
  mercury: '#E7E7E7',
  cardinal: '#C91A44',
  atomicTangerine: '#FF9565',
  watusi: '#FFE0D2',
  pippin: '#FFE9E0',
  deepBlush: '#E26E8A',
  seaPink: '#EC9DB0',
  pigPink: '#FCD1DB',
  emerald: '#36CA68',
  red: '#FF0000',
  webOrange: '#FFA800',
  dodgerBlue: '#336CFF',
  electricViolet: '#B52CF5',
  concrete: '#F3F3F3',
  gallery: '#EAEAEA',
  alto: '#D6D6D6',
  silver: '#BFBFBF',
  silverChalice: '#A9A9A9',
  gray: '#929292',
  Tundora: '#424242',
  grey100: '#F7F7F7',
  vividViolet: '#A12FA3',
  telegram: '#108EE9',
  light: '#EAEAEA',
  lightningYellow: '#FDBD15',
  yellow: '#FCC916',
  rawSienna: '#D99244',
  logan: '#A7B1CA',
  nobel: '#B8B7B7',
};

const Light = {
  COLORS: {
    ...common,
    primary: '#E46125',
    secondary: '#EFEFEF',
    textPrimary: '#000000',
    textSecondary: '#24264E',
  },
  fonts: {
    medium: 'Lexend-Medium',
    semiBold: 'Lexend-SemiBold',
    regular: 'Lexend-Regular',
  },
};

const Dark = {
  colors: {
    ...common,
    primary: '#607d8b',
    secondary: '#607d8b',
    textPrimary: '#607d8b',
    textSecondary: '#607d8b',
  },
  fonts: {
    medium: 'Lexend-Medium',
    semiBold: 'Lexend-SemiBold',
    regular: 'Lexend-Regular',
  },
};

export const Themes = Light;

export const ThemesDark = Dark;
