import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Button, Dialog, Portal, } from 'react-native-paper';
import PopupStyle from '../componentStyles/Popup.style';

interface PopupProps {
  isVisible: boolean;
  onSelect: () => void;
  setIsVisible: (isVisible: boolean) => void;
  message: string;
  buttonText: string
}

const Popup: React.FC<PopupProps> = ({ isVisible, setIsVisible, onSelect, message, buttonText }) => {
 
  return (
    <Portal>
      <Dialog style={{}} visible={isVisible} onDismiss={() => setIsVisible(false)}>
        <View style={{ alignItems: 'center' }}>
          <Dialog.Content style={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <View style={PopupStyle.popupContainer}>
              <Text style={PopupStyle.popupMessage}>{message}</Text>
              <TouchableOpacity onPress={onSelect} style={PopupStyle.closeButton}>
                <Text style={PopupStyle.closeButtonText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </Dialog.Content>
        </View>
        <Dialog.Actions>
          <Button onPress={() => setIsVisible(false)}>Back</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default Popup;
