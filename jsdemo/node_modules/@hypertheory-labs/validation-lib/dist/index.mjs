//#region src/internal/string-validators.ts
const required = (value) => {
	value = value ?? "";
	return value.trim().length > 0 ? ok : fail("Value is required");
};
const minLength = (n) => (value) => value.length >= n ? ok : fail(`Must be at least ${n} characters`);
const maxLength = (n) => (value) => value.length <= n ? ok : fail(`Must be at less than ${n} characters`);
//#endregion
//#region src/internal/validators.ts
const ok = { valid: true };
const fail = (message) => ({
	valid: false,
	message
});
const min = (n) => (value) => value >= n ? ok : fail(`Must be at least ${n}`);
const max = (n) => (value) => value <= n ? ok : fail(`Must be at most ${n}`);
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const email = (value) => emailRe.test(value) ? ok : fail("Must be a valid email address");
/**
* This is a a way to compose n number of validator functions into one validator
* @param validators
* @returns ValidationResult
*/
const compose = (...validators) => (value) => {
	for (const v of validators) {
		const result = v(value);
		if (!result.valid) return result;
	}
	return ok;
};
const exactLength = (n) => (value) => compose(minLength(n), maxLength(n))(value);
//#endregion
//#region src/internal/advanced-validators.ts
const isValidCreditCard = (number) => {
	const clean = number.replace(/\D/g, "");
	if (clean.length === 0) return {
		valid: false,
		message: "Must be a valid credit card number"
	};
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
	return sum % 10 === 0 ? { valid: true } : {
		valid: false,
		message: "Must be a valid credit card number"
	};
};
//#endregion
//#region src/internal/seating.ts
function assertNever(value) {
	throw new Error(`Unhandled case ${JSON.stringify(value)} `);
}
const getSeatCost = (seat) => {
	switch (seat) {
		case "aisle": return 100.23;
		case "middle": return 85.43;
		case "window": return 105.23;
		case "jump": return 50;
		default: assertNever(seat);
	}
};
//#endregion
export { compose, email, exactLength, fail, getSeatCost, isValidCreditCard, max, maxLength, min, minLength, ok, required };

//# sourceMappingURL=index.mjs.map