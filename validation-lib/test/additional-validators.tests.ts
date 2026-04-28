import { describe, it, expect } from "vitest";
import type { Validator } from "../src/types";

describe("custom validator", () => {

  type User = { dateOfBirth: Date; name: string };

  const isAdult: Validator<User> = (user) => {
    const today = new Date();
    const age = today.getFullYear() - user.dateOfBirth.getFullYear();
    if (age > 18) return { valid: true };
    if (age < 18)
      return { valid: false, message: "Must be at least 18 years old" };

    // If age is exactly 18, check the month and day
    const monthDiff = today.getMonth() - user.dateOfBirth.getMonth();
    if (monthDiff > 0) return { valid: true };
    if (monthDiff < 0)
      return { valid: false, message: "Must be at least 18 years old" };

    const dayDiff = today.getDate() - user.dateOfBirth.getDate();
    if (dayDiff >= 0) return { valid: true };
    return { valid: false, message: "Must be at least 18 years old" };
  };

  // uses Luhn algorithm to validate credit card numbers
  // https://en.wikipedia.org/wiki/Luhn_algorithm
  // This is just an example of a more complex validator that doesn't fit the simple patterns of the built-in ones.
  const isValidCreditCard: Validator<string> = (number) => {

    const clean = number.replace(/\D/g, "");

    if (clean.length === 0) {
      return { valid: false, message: "Must be a valid credit card number" };
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = clean.length - 1; i >= 0; i--) {
      let digit = parseInt(clean.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0
      ? { valid: true }
      : { valid: false, message: "Must be a valid credit card number" };
  };    

  it("validates that user is an adult", () => {
    const adultUser: User = {
      name: "Alice",
      dateOfBirth: new Date(1990, 0, 1),
    };
    const minorUser: User = { name: "Bob", dateOfBirth: new Date(2010, 0, 1) };

    expect(isAdult(adultUser).valid).toBe(true);
    const result = isAdult(minorUser);
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.message).toMatch(/at least 18/i);
    }
  });
  it.each([
    "4111 1111 1111 1111", // Visa
    "5500 0000 0000 0004", // MasterCard
    "3400 0000 0000 009", // American Express
    "3000 0000 0000 04", // Diners Club
    "6011 0000 0000 0004", // Discover
    "2014 0000 0000 009", // enRoute
    "3530 1113 3330 0000", // JCB
  ])("validates credit card number: %s", (number) => {
    expect(isValidCreditCard(number).valid).toBe(true);
  });

   it.each([
     "1234 5678 9012 3456",
     "4111-1111-1111-1112",
     "5500.0000.0000.0005",
     "3400/0000/0000/008",
     "not a number",
   ])("rejects invalid credit card number: %s", (number) => {
     expect(isValidCreditCard(number).valid).toBe(false);
   });  
});