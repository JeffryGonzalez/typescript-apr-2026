import type { ValidationResult, Validator } from "./types";

const ok: { valid: true } = { valid: true };
const fail = (message: string): { valid: false; message: string } => ({
  valid: false,
  message,
});

export const required: Validator<string> = (value) =>
  value.trim().length > 0 ? ok : fail("Value is required");

export const minLength =
  (n: number): Validator<string> =>
  (value) =>
    value.length >= n ? ok : fail(`Must be at least ${n} characters`);

export const maxLength =
  (n: number): Validator<string> =>
  (value) =>
    value.length <= n ? ok : fail(`Must be at less than ${n} characters`);

export const min =
  (n: number): Validator<number> =>
  (value) =>
    value >= n ? ok : fail(`Must be at least ${n}`);

export const max =
  (n: number): Validator<number> =>
  (value) =>
    value <= n ? ok : fail(`Must be at most ${n}`);

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const email: Validator<string> = (value) =>
  emailRe.test(value) ? ok : fail("Must be a valid email address");

export const url: Validator<string> = (value) => {
  try {
    new URL(value); // TODO: Requires DOM - or use a REGEX.
    return ok;
  } catch {
    return fail("Must be a valid URL");
  }
};
// Below is JSDoc a way to document ts and js functions.

/**
 * This is a a way to compose n number of validator functions into one validator
 * @param validators
 * @returns ValidationResult
 */
export const compose =
  <T>(...validators: Validator<T>[]): Validator<T> =>
  (value): ValidationResult => {
    for (const v of validators) {
      const result = v(value);
      if (!result.valid) return result;
    }
    return ok;
  };

export const exactLength =
  (n: number) =>
  (value: string): ValidationResult =>
    compose(minLength(n), maxLength(n))(value);
