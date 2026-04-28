import { describe, expect, it} from 'vitest';
import { compose, exactLength, maxLength, min, minLength, required } from '../src';

describe("required", () => {
    it("passes for a non-empty string", () => {
        expect(required("Hello")).toEqual({ valid: true});
    });

    it
    .each(["", " ", "     "])
    ("fails for an empty string", (input: string) => {
        const result = required(input);
        expect(result.valid).toBe(false);
        // more here soon.
        
        if(!result.valid) {
            expect(result.message).toBe("Value is required")
        }
    })

    it('minLength passes', () =>  {
        const atLeastFiveLettersLong = minLength(5);
        expect(atLeastFiveLettersLong("12345").valid).toBe(true);
    });
    it('minLengthFails on four', () => {
        const v = minLength(4);
        const result = v("dog");
        expect(result.valid).toBe(false);
        if(!result.valid) {
            expect(result.message).toBe("Must be at least 4 characters");
        }

        var bad = minLength(100)("pizza");

        
    })
    it('maxxLength', () => {
        
        const stateCodeValidator = compose(
            required, 
            maxLength(2), 
            minLength(2)
        );
        expect(stateCodeValidator('OH').valid).toBe(true);

        expect(stateCodeValidator('O').valid).toBe(false);

        // const scValidator =exactLength(2);
        //         expect(scValidator('OH').valid).toBe(true);

        // expect(scValidator('O').valid).toBe(false);
        
    })

    describe('Min and Max Numbers', () => {
        it('does minimum', () => {
            const minOf10 = min(10);
            expect(minOf10(10).valid).toBe(true);
            expect(minOf10(9).valid).toBe(false);
        })
    });

    describe.skip('Email Addresses',() => {

    });
    describe.skip('Url', () => {

    });

    describe.skip('Credit Card Number using Mod 10 / Luhn', () => {
        // https://en.wikipedia.org/wiki/Luhn_algorithm
    });
})