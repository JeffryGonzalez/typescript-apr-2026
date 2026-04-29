import { required, minLength } from '@hypertheory-labs/validation-lib';

console.log(required()); //todo - change to null or undefined, or leave off.
console.log(minLength(4)(undefined)); // todo - same here.