import { Pipe, PipeTransform } from '@angular/core';
import { Employee, EmployeeName } from '../employees/employees.component'; //Import interface

@Pipe({
  name: 'sortingEmployees'
})
export class SortingEmployeesPipe implements PipeTransform {

  transform(items: Employee[], path: string[], isDesc: boolean): Employee[] {

    // Check if is not null
    if (!items || !path ) return items;

    return items.sort((a: Employee, b: Employee) => {
      // We go for each property followed by path
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })

      let comparison = 0;
      if (a > b) {
        comparison = 1;
      } else if (a < b) {
        comparison = -1;
      }

      return isDesc ? (comparison * -1) : comparison;

    })
  }

}
