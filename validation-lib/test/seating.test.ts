import { describe, expect, it } from "vitest";
import { getSeatCost } from "../src";

describe("seating", () => {
    it("does stuff", () => {
        expect(getSeatCost('jump')).toBe(105.23);
    });
})