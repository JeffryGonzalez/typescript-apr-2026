//#region src/types.d.ts
type ValidationResult = {
  valid: true;
} | {
  valid: false;
  message: string;
};
type Validator<T> = (value: T) => ValidationResult;
//#endregion
//#region src/internal/validators.d.ts
declare const ok: {
  valid: true;
};
declare const fail: (message: string) => {
  valid: false;
  message: string;
};
declare const min: (n: number) => Validator<number>;
declare const max: (n: number) => Validator<number>;
declare const email: Validator<string>;
/**
 * This is a a way to compose n number of validator functions into one validator
 * @param validators
 * @returns ValidationResult
 */
declare const compose: <T>(...validators: Validator<T>[]) => Validator<T>;
declare const exactLength: (n: number) => (value: string) => ValidationResult;
//#endregion
//#region src/internal/advanced-validators.d.ts
declare const isValidCreditCard: Validator<string>;
//#endregion
//#region src/internal/string-validators.d.ts
declare const required: Validator<string>;
declare const minLength: (n: number) => Validator<string>;
declare const maxLength: (n: number) => Validator<string>;
//#endregion
//#region src/internal/seating.d.ts
type SeatType = "window" | "aisle" | "middle" | "jump";
declare const getSeatCost: (seat: SeatType) => 100.23 | 85.43 | 105.23 | 50;
//#endregion
export { type SeatType, compose, email, exactLength, fail, getSeatCost, isValidCreditCard, max, maxLength, min, minLength, ok, required };
//# sourceMappingURL=index.d.mts.map