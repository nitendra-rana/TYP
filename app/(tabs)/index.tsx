import { StyleSheet, useColorScheme } from 'react-native';
import { View } from '../../components/Themed';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { IOTextInput } from '../../components/TextInput/IOTextInput';
import { TouchableRipple, Button } from 'react-native-paper';
import { Image, Svg } from 'react-native-svg';


export default function TabTwoScreen() {
  const formMethods = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data); // Handle the form data as needed
  };

  const colorScheme = useColorScheme();

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionContainer}>
        <Svg width="200" height="200">
          {
            (colorScheme === 'dark') ?
              <Image
                href={require("../../assets/images/icon.png")}
                width="100%"
                height="100%"
              />
              :
              <Image
                href={require("../../assets/images/icon2.png")}
                width="100%"
                height="100%"
              />
          }

        </Svg>
      </View>
      <FormProvider {...formMethods}>
        <View style={styles.sectionContainer}>
          <IOTextInput
            style={styles.inputBox}
            title={"Profession"}
            name={'profession'}
            error={''}
            placeholder="Enter your Profession"
          />
          <IOTextInput
            style={styles.inputBox}
            title={"Work/Study Hours"}
            name={'studyHours'}
            error={''}
            keyboardType="numeric"
            placeholder="Enter a number of hours to study/work"
          />
        </View>

        <TouchableRipple
          onPress={formMethods.handleSubmit(onSubmit)}
          rippleColor="rgba(255, 87, 51, 0.3)" // Ripple color when pressed
          style={styles.touchable}
        >
          <View style={styles.button}>
            <Button mode="contained" color="#FF5733" labelStyle={styles.buttonLabel}>
              Submit Details
            </Button>
          </View>
        </TouchableRipple>
      </FormProvider>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    alignItems: 'center',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  inputBox: {
    padding: 20,
    borderWidth: 0.3,
    borderRadius: 10,
  },
  touchable: {
    marginTop: 20,
    borderRadius: 2, // You can adjust the border radius to match your styling
  },
  button: {
    alignItems: 'center',
    padding: 20,
  },
  buttonLabel: {
    color: 'white', // Customize the label color
    padding: 15,
  },
});
