import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {

  public employeeList: Employee[];

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.getEmployees()
      .subscribe(result => {
        console.log('dataSvc.getEmployees',result);
        this.employeeList = result.employees;
      }, err => {
        console.log('dataSvc.getEmployees ERROR!');
      });
  }

}


interface Employee {
  userId: number;
  name: EmployeeName;
  age: number;
  departmentId: number;
  phone: string;
  nationality: string;
  registeredDate: Date;
  isAccountActive: boolean;
}

interface EmployeeName {
  first: string;
  last: string;
}

