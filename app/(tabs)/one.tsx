
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useRef, useState, useEffect } from 'react';
import StatusButton from '../../components/Status/StatusButton';
import useLocalStorage from '../../Storage/LocalStorage';
import { ScrollView } from 'react-native-gesture-handler';
import { err } from 'react-native-svg/lib/typescript/xml';

const timeMultiple = 60 * 60;
const remainingTimeCalculation = (remainingTime: number) => {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  return (
    <View style={{ alignItems: 'center' }}>
      <Text>{`${hours}:${minutes}:${seconds}`}</Text>
      <Text>left</Text>
    </View>
  );
}
export type currentStatus = 'on' | 'off' | undefined;

type ActivityDetails = {
  status: string | undefined;
  startTime: String;
}
export default function TabOneScreen() {
  const { setUserData, getUserData } = useLocalStorage()
  const [workingTimer, setWorkingTimer] = useState<number>(20);
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentWorkingStatus, setCurrentWorkingStatus] = useState<currentStatus>(undefined)
  const [userDailyLogs, setUserDailyLogs] = useState<ActivityDetails[] | []>([]);
  const working = useRef(0);
  const shiftTimer = (remainingTime: number) => {
    working.current = workingTimer - remainingTime;
    return remainingTimeCalculation(remainingTime);
  };

  const getDetails = async () => {
    const userData = await getUserData('user-details')
    if (userData) {
      setUserDailyLogs(userData)
    }
  }
  const setDetails = async () => {
    const userData = await setUserData('user-details', userDailyLogs)
  }
  useEffect(() => {
    try {
      getDetails();
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    const updateData = async () => {
      if (userDailyLogs && currentWorkingStatus != undefined) {
        const currentTime = new Date().toLocaleTimeString();
        const recentLog: ActivityDetails = {
          status: currentWorkingStatus,
          startTime: currentTime.toString(),
        }
        if (userDailyLogs.length != 0) {
          setUserDailyLogs(prev => [...prev, recentLog])
        } else {
          setUserDailyLogs([recentLog])
          await setUserData('user-details', userDailyLogs)
        }
        console.log("userLogs => " + userDailyLogs + " ==>", recentLog);
      } else {
        console.log("there is no data ==> ")
      }
    }
    updateData();
  }, [currentWorkingStatus])
  return (
    <>

      <ScrollView>
        <View style={styles.sectionContainer}>
          <View style={styles.statusButtonContainer}>
            <StatusButton status={currentWorkingStatus} setStatus={setCurrentWorkingStatus} />
          </View>
          <View style={styles.circle}>
            <Text style={{ paddingVertical: 12 }}>Studying</Text>
            <CountdownCircleTimer
              size={200}
              isPlaying={currentWorkingStatus === 'on'}
              duration={workingTimer}
              colors={['#99EFFF', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[70, 50, 20, 0]}
            >
              {(remainingTime) => shiftTimer(remainingTime.remainingTime)}
            </CountdownCircleTimer>
          </View>
          <View style={styles.circle}>
            <Text style={{ paddingVertical: 12 }}>Not Studying</Text>
            <CountdownCircleTimer
              size={100}
              isPlaying={currentWorkingStatus === 'off'}
              duration={workingTimer}
              colors={['#99EFFF', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[70, 50, 20, 0]}
            >
              {(remainingTime) => shiftTimer(remainingTime.remainingTime)}
            </CountdownCircleTimer>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          {
            userDailyLogs.length != 0 ?
              (userDailyLogs.map((item) =>
                <View style={styles.sectionContainer}>
                  <Text key={`${item.startTime}`} style={styles.title}>
                    {item.status === 'on' ? 
                    "Started Studying at => " 
                    :"Stopped studying at => "}{item.startTime}
                  </Text>
                </View>
              )) :
              <Text>No Log Data</Text>

          }
        </View>
      </ScrollView>
    </>

  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  sectionContainer: {
    padding: 20,
    marginVertical: 12,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingBottom: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowColor: 'black',
    shadowRadius: 3.84,
  },

  statusButtonContainer: {
    margin: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusButton: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    alignItems: 'center',
  }

});
