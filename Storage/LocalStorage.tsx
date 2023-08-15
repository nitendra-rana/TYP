import AsyncStorage from "@react-native-async-storage/async-storage";


const useLocalStorage = () => {
  // Store user data in AsyncStorage
  const setUserData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('User data saved successfully.');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Retrieve user data from AsyncStorage
  const getUserData = async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        return JSON.parse(data);
      } else {
        console.log('No user data found.');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };


  //clean all data 
  const removeUserData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('User data removed successfully.');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  return {
    setUserData,
    getUserData,
    removeUserData,
  }

}
export default useLocalStorage;