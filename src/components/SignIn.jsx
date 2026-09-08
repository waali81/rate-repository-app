import Text from './Text';
import { useFormik } from 'formik';
import { TextInput, Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    padding: 10,
    borderRadius: 10,
  },
  passwordInput: {
    marginTop: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={[styles.input, styles.passwordInput]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="white" fontWeight="bold">Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;