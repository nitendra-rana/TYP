import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    width: '100%',
  },
  LoginInputView: {
    height: 40,
    flex: 1,
    backgroundColor: '#00405E',
    margin: 1,
    borderRadius: 5,
  },
  inputView: {
    height: 40,
    flex: 1,
    margin: 1,
    borderRadius: 5,
    paddingLeft: 12,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowColor: 'black',
    shadowRadius: 3.84,
  },
  title: {
    paddingLeft: 2,
    paddingBottom: 6,
    paddingTop: 4,
    fontSize: 16,
  },
  inputBorder: {
    flex: 1,
    width: '100%',
  },
  error: {
    color: 'red',
  },
});

export default styles;
