import React, { useEffect } from 'react';
import firebase from "firebase/app";

import { useMemoState } from 'hooks';

import ConnectedSendCodeForm from './SendCodeForm';

export const withSendCodeHOC = <T extends Record<string, unknown>>(Component: React.FC<T>) => (props: T) => {
  const [isCodeSent, setIsCodeSent] = useMemoState(false);
  const [isCaptchaLoading, setIsCaptchaLoading] = useMemoState(false);

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('auth-button', {
      size: 'invisible',
      callback: () => {
        setIsCodeSent(true);
      },
    });
  }, []);

  if(isCodeSent) {
    return (
      <ConnectedSendCodeForm
        onCapchaLoading={setIsCaptchaLoading}
        onCodeSent={setIsCodeSent}
      />
    );
  }

  return (
    <Component 
      {...props }
      isCaptchaLoading={isCaptchaLoading}
      onCapchaLoading={setIsCaptchaLoading}
    />
  );
};