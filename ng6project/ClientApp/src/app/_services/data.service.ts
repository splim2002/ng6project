import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Employee, Department } from '../employees/employees.component';

@Injectable()
//@Injectable({
//  providedIn: 'root'
//})
export class DataService {

  private baseUrl: string = '';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  //LOGIN
  private token: string = "";
  private tokenExpiration: Date;

  public get loginRequired(): boolean {
    return this.token.length == 0 || this.tokenExpiration > new Date();
  }

  //LOGIN
  login(creds): Observable<boolean> {
    return this.http
      .post(this.baseUrl + 'api/SampleData/CreateToken', creds)
      .map((data: any) => {
        this.token = data.token;
        this.tokenExpiration = data.expiration;
        return true;
      });
  }

  //Employee Data
  getEmployees(): any {
    return this.http.get(this.baseUrl + 'assets/data/employee-list.json');
  }
  getDepartments(): any {
    return this.http.get(this.baseUrl + 'assets/data/employee-department.json');
  }


  /*
   * Employee List (Type 2) - Using Observable
   */
  getEmployeesType2(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.baseUrl + 'assets/data/employee-list-type2.json');
  }
  getAllEmployees(selDepartmentId: number, searchText: string, sortPath: string[], isDesc: boolean): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.baseUrl + 'assets/data/employee-list.json')
      .map((res: any) => res.employees)
      .map((results: Employee[]) => {
        if (selDepartmentId == 0 && !searchText) {
          return results;
        }

        let tempVar: Employee[] = results;
        if (selDepartmentId > 0) {
          tempVar = tempVar.filter((item: Employee) => item.departmentId === selDepartmentId);
        }
        if (searchText) {
          let tempKeyword: string = searchText.toLocaleLowerCase();
          tempVar = tempVar.filter((item: Employee) =>
            (
              item.name.first.toLocaleLowerCase().includes(tempKeyword) ||
              item.name.last.toLocaleLowerCase().includes(tempKeyword) ||
              item.nationality.toLocaleLowerCase().includes(tempKeyword) ||
              item.age.toString().toLocaleLowerCase().includes(tempKeyword)
            )
          );
        }
        return tempVar;
      })
      .map(results => results.sort(
        (a: Employee, b: Employee) => {
          // We go for each property followed by path
          sortPath.forEach(property => {
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

        }
      ))
      ;
  }
}
