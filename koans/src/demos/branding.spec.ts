import { describe, it } from "vitest";
import { transferEmployee } from "./hr";

describe("Branded Types", () => {

    it('example 1 leadup', () => {
     


        const employeeId = '123-89';
        const departmentId = 'DEV';

        transferEmployee(departmentId, employeeId);
    })
});