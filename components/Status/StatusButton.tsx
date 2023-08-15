import React, { useState, FC } from 'react'
import { View, Text } from '../Themed'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './Status.style'
import { currentStatus } from '../../app/(tabs)/one'
import Popup from '../PopupInput'
interface statusButtonProps {
  status: currentStatus;
  setStatus: (status: currentStatus) => void;
}

const StatusButton: FC<statusButtonProps> = ({ status, setStatus }) => {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const [localStatus, setLoaclStatus] = useState<currentStatus>();

  const activeStatus = { backgroundColor: 'green' };
  const handleSelected = (status: currentStatus) => {
    setStatus(status)
    setIsPopup(false)
  }
  const handlePopup = (selectedStatus: currentStatus) => {
    if (status != selectedStatus) {
      setIsPopup(true)
      setLoaclStatus(selectedStatus);
    }
  }
  return (
    <>
      <View style={styles.buttonContainerRight}>
        <Popup
          isVisible={isPopup}
          setIsVisible={setIsPopup}
          onSelect={() => handleSelected(localStatus)}
          message='do you want to change status'
          buttonText='change Status' />
        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "off" ? activeStatus : null,
          ]}
          onPress={() => handlePopup('off')}
        >
          <Text style={styles.statusText}>Not Studying</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainerRight}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            status === "on" ? activeStatus : null,
          ]}
          onPress={() => handlePopup('on')}
        >
          <Text style={styles.statusText}>Studying</Text>
        </TouchableOpacity>
      </View>
    </>

  )
}

export default StatusButton
