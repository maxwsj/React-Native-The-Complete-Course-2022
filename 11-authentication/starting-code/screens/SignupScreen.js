import { useState, useContext } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';

function SignupScreen() {
   const [isAuthenticating, setIsAuthenticating] = useState(false);

   const authCtx = useContext(AuthContext);

   // To be able to see the loading spiner we need to convert this function to an async function
   async function signupHandler({ email, password }) {
      setIsAuthenticating(true);
      try {
         const token = await createUser(email, password);
         authCtx.authenticate(token);
      } catch (error) {
         Alert.alert(
            'Authentication failed!',
            'Could not create user, please check your inputs and try again later!'
         );
         setIsAuthenticating(false);
      }
   }

   if (isAuthenticating) {
      return <LoadingOverlay message='Creating user...' />;
   }

   return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
