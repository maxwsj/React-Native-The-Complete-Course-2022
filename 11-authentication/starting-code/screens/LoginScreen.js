import { useState, useContext } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

function LoginScreen() {
   const [isAuthenticating, setIsAuthenticating] = useState(false);

   const authCtx = useContext(AuthContext);

   // To be able to see the loading spiner we need to convert this function to an async function
   async function loginHandler({ email, password }) {
      setIsAuthenticating(true);
      try {
         const token = await login(email, password);
         authCtx.authenticate(token);
      } catch (error) {
         Alert.alert(
            'Authentication failed!',
            'Could not log you in. Please check your credentials or try again later!'
         );
         setIsAuthenticating(false);
      }
   }

   if (isAuthenticating) {
      return <LoadingOverlay message='Logging you in...' />;
   }

   return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
