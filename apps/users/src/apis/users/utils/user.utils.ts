import { randomInt } from 'crypto';
import moment from 'moment';

export function validatePassword(password: string) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
  return regex.test(password);
}

/**
 * Generate secure 6-digit code (100000 – 999999)
 */
export const generateSecureCode = (): number => {
  return randomInt(100_000, 999_999); // 6-digit
};

/**
 * 15 minutes from now
 */
export const getExpiresAt = (): Date => {
  return moment().add(15, 'minutes').toDate();
};
