import Text from './Text';
import { useFormik } from 'formik';
import { TextInput, Pressable, StyleSheet, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../graphql/queries';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.repositoryItemBackground,
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
  inputSpacing: {
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
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),

  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),

  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      await createUser({
        variables: {
          user: {
            username: values.username,
            password: values.password,
          },
        },
      });
      await signIn({
        username: values.username,
        password: values.password,
      });
      navigate('/');
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
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
          styles.inputSpacing,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
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

      <TextInput
        style={[
          styles.input,
          styles.inputSpacing,
          formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation &&
            styles.inputError,
        ]}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
        secureTextEntry
      />

      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.error}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text color="white" fontWeight="bold">
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;