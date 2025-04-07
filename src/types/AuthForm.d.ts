import React from 'react';

declare module './AuthForm' {
    const AuthForm: React.FC;
    export default AuthForm;
}

declare module '../AuthForm' {
  interface AuthFormProps {
    onSuccess?: () => void;
    mode?: 'signin' | 'signup';
  }

  const AuthForm: React.FC<AuthFormProps>;
  export default AuthForm;
} 