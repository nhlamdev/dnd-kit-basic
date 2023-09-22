import { v4 as uuidv4 } from "uuid";

export interface Employee {
  _id: string;
  name: string;
  title: string;
}

export interface Manager {
  _id: string;
  name: string;
  title: string;
  employees: Employee[];
}

const generateRandomEmployee = (): Employee => ({
  _id: uuidv4(),
  name: `Employee_${uuidv4().substr(0, 8)}`,
  title: "Employee",
});

const generateRandomManager = (): Manager => ({
  _id: uuidv4(),
  name: `Manager_${uuidv4().substr(0, 8)}`,
  title: "Manager",
  employees: Array.from({ length: 3 }, () => generateRandomEmployee()),
});

export const managers: Manager[] = Array.from({ length: 5 }, () =>
  generateRandomManager()
);
