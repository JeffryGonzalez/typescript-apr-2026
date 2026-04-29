export function getEmployeeById(id: string) {
  return {
    id,
    name: 'Test Employee',
  };
}

export function getDepartments() {
  return [{ id: 'Dev' }, { id: 'QA' }, { id: 'Sales' }];
}

export function transferEmployee(employeeId: string, departmentId: string) {}
