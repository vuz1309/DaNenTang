// styles.js
import {StyleSheet} from 'react-native';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formHeader: {
    textAlign: 'center',
    paddingBottom: 32,
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
  footerLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  submitBtn: {
    width: '90%',
    marginTop: 24,
  },
});
