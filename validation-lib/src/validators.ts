import type { ValidationResult, Validator } from "./types";

const ok: { valid: true} = { valid: true}
const fail = (message:string): {valid: false; message: string} => ({
        valid: false,
        message
})

export const required: Validator<string> = (value) => 
    value.trim().length > 0 ? ok : fail("Value is required")

export const minLength =
 (n: number): Validator<string> => 
 (value) => value.length >= n ? ok : fail(`Must be at least ${n} characters`);

 export const maxLength = 
 (n: number): Validator<string> =>
 (value) => value.length <= n ? ok : fail(`Must be at less than ${n} characters`)

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
        if(!result.valid) return result;
    }
    return ok;
}

// export const exactLength = 
//  (n: number) =>
//     (value:string): ValidationResult => compose(minLength(n), maxLength(n))