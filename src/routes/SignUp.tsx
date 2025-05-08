import RegistrationForm from '@features/RegistrationForm/RegistrationForm';
import { Link } from 'react-router';

const SignUp = () => {
  return (
    <>
      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
      <RegistrationForm />
    </>
  );
};

export default SignUp;
