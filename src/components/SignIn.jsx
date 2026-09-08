import Text from './Text';
import { useFormik } from 'formik';
import { TextInput, Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    padding: 10,
    borderRadius: 10,
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
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
  error: {
    color: theme.colors.error,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.inputError,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />

      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          styles.passwordInput,
          formik.touched.password && formik.errors.password && styles.inputError,
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />

      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="white" fontWeight="bold">Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;