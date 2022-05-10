import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

// import { UserContext } from '../../contexts/user.context';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  // console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password do not match');
      return;
    }

    /// Create user
    // try catch because it's may be can fail
    try {
      /// user is destructing from respone
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Store to data
      // setCurrentUser(user);

      /// After get back response user
      /// Displayname se khong co o tren res user tren, do do phai add them neu muon them vao user
      await createUserDocumentFromAuth(user, { displayName });
      /// Clear signup
      resetFormFields();
    } catch (error) {
      /// Catch error
      if (error.code === 'auth/email-already-in-use') {
        alert('This account is already in use');
      } else {
        console.log('user creation encountered an error', error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Do not have an account ?</h2>
      <span>Sign up with your email</span>
      <form onSubmit={handleSubmit}>
        {/* <FormInput
          label="Display name"
          inputOptions={{
            type: 'text',
            required: true,
            onChange: handleChange,
            name: 'displayName',
            value: displayName
          }}
        /> */}

        <FormInput
          label="Display name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Create account</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
