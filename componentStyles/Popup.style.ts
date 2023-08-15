import { StyleSheet } from 'react-native';

const PopupStyle = StyleSheet.create({

  popupContainer: {
    alignItems: 'center',
  },
  popupMessage: {
    color:'red',
    fontSize: 15,
    margin: 25,
  },
  closeButton: {
    padding:15,
    backgroundColor: '#365F7C',
    borderRadius: 10,

  },
  closeButtonText: {
    fontWeight: 'bold',
    fontSize:30,
  },
});

export default PopupStyle;
