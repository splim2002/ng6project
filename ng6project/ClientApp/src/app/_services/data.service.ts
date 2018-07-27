import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

import { Employee } from '../employees/employees.component';

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

  getEmployeesType2(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.baseUrl + 'assets/data/employee-list-type2.json');
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.baseUrl + 'assets/data/employee-list.json')
      .map((res: any) => res.employees);
  }

}
