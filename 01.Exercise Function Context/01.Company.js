class Company {
  constructor() {
    this.departments = [];
  }

  addEmployee(username, salary, position, department) {
    if (!username || !salary || !position || !department) {
      throw new Error("Invalid input!");
    }

    if (salary < 0) {
      throw new Error(" Invalid input!");
    }

    let newEmployee = {
      username,
      salary,
      position,
    };

    let targetDepartment = this.departments.find((d) => d.name === department);

    if (!targetDepartment) {
      targetDepartment = {
        name: department,
        employees: [],
        totalSalary: 0,
        averageSalary: function () {
          return this.totalSalary / this.employees.length;
        },
      };

      this.departments.push(targetDepartment);
    }

    targetDepartment.employees.push(newEmployee);
    targetDepartment.totalSalary += salary;

    return `New employee is hired. Name: ${username}. Position: ${position}`;
  }

  bestDepartment() {
    let bestDepartment = this.departments.sort(
      (a, b) => b.averageSalary() - a.averageSalary()
    )[0];

    let employeesBestDepartment = bestDepartment.employees.sort(
      (a, b) => b.salary - a.salary || a.username.localeCompare(b.username)
    );

    let result =
      `Best Department is: ${bestDepartment.name}` +
      "\n" +
      `Average salary: ${bestDepartment.averageSalary().toFixed(2)}` +
      "\n" +
      employeesBestDepartment
        .map((e) => `${e.username} ${e.salary} ${e.position}`)
        .join("\n");

    return result;
  }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
