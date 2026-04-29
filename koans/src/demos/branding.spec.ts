import { describe, it } from 'vitest';
import {
  assignDepartment,
  getDepartments,
  getEmployeeById,
  giveEmployeeRaise,
  hire,
  saveNewEmployee,
  transferEmployee,
  transferEmployee2,
} from './hr';
import { isNone, isSome } from './hr/option';
import { isSuccess } from './hr/results';

describe('Branded Types', () => {
  it('example 1 leadup', () => {
    // This is *WAY* More about 'making impossible states possible'
    // than any particular pattern.

    const employeeOption = getEmployeeById('9932');
    
    if (isSome(employeeOption)) {
      const employee = employeeOption.value;
      const departments = getDepartments();
      const department = departments[0]!;

      transferEmployee2(department, employee);

      giveEmployeeRaise(employee);

      const chris = hire('Chris');

      const chris2 = assignDepartment(chris, department);

      if(isSuccess( saveNewEmployee(chris2))) {
        // saved the employee just fine!
        
      } else {
        // did not save
      }
    }

    if(isNone(employeeOption)) {
        console.log('No Employee with that id!');
    }
  });
});

describe('what about errors?', () => {});
