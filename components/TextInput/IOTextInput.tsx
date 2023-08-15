import React, { FC, forwardRef } from 'react';
import { Text, TextInput, View, TextInputProps } from 'react-native';
import styles from './TextInput.styles';
import LinearGradient from 'react-native-linear-gradient';
import { useController } from 'react-hook-form';

interface IOTextInputProps {
  title: string;
  type?: 'login' | 'default';
  name: string;
  error: any;
  defaultValue?: string | number;
  editable?: boolean;
}

type Props = TextInputProps & IOTextInputProps;

const IOTextInput: FC<Props> = forwardRef<TextInput, Props>(
  ({ title, type = 'default', name, defaultValue, error, ...props }, ref) => {
    const { field } = useController({ name, defaultValue });

    let titleColor = { color: 'black' };
    if (type === 'login') {
      titleColor = { color: 'white' };
    }

    let errorColor = { backgroundColor: 'white' };
    if (error) {
      errorColor = { backgroundColor: 'red' };
    }
    const onChange = (val: string) => {
      const result = val;
      field.onChange(result);
    };

    return (
      <View style={styles.container}>
        <View>
          <Text style={[styles.title, titleColor]}>{title}</Text>
        </View>
        <View style={[styles.inputContainer, errorColor]}>
          <View style={styles.inputBorder}>
            <TextInput
              ref={ref}
              style={styles.inputView}
              value={`${field.value}`}
              onChangeText={onChange}
              {...props}
            />
          </View>
        </View>
        {error ? <Text style={styles.error}>{error.message}</Text> : null}
      </View>
    );
  }
);

IOTextInput.displayName = 'IOTextInput';
export { IOTextInput };
