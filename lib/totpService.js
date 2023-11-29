import { authenticator } from 'otplib';

authenticator.options = { step: 30 }; // Set TOTP to change every 10 seconds

export const generateSecret = () => {
  return authenticator.generateSecret();
};

export const generateOTP = (secret) => {
  return authenticator.generate(secret);
};

export const verifyOTP = (token, secret) => {
  return authenticator.verify({ token, secret });
};
