import type { Validator } from "../types";
import  { ok, fail } from "./validators";

export const required: Validator<string> = (value) => {
  // if(!value) {
  //   throw new Error("Can't work on null or undefined values");
  // }
  return value.trim().length > 0 ? ok : fail("Value is required");
}

export const minLength =
  (n: number): Validator<string> =>
  (value) =>
    value.length >= n ? ok : fail(`Must be at least ${n} characters`);

export const maxLength =
  (n: number): Validator<string> =>
  (value) =>
    value.length <= n ? ok : fail(`Must be at less than ${n} characters`);
