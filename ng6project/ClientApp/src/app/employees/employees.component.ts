import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';

//Pipe
import { FilterByNamePipe } from '../_pipe/filter-by-name.pipe';
import { OrderByPipe } from '../_pipe/order-by.pipe';
import { SortingEmployeesPipe } from '../_pipe/sorting-employees.pipe';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {

  public employeeList: Employee[];
  public sortKey: string = 'name.first';
  public sortPath: string[] = this.sortKey.split('.');
  public reverse: boolean = false;

  public departmentList: Department[] = [];

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.getEmployees()
      .subscribe(result => {
        this.employeeList = result.employees;
      }, err => {
        console.log('dataSvc.getEmployees ERROR!');
      });

    //Prepare department list
    this.dataSvc.getDepartments()
      .subscribe(result => {
        this.departmentList = result.departments;
      }, err => {
        console.log('dataSvc.getDepartments ERROR!');
      });
  }

  sortby(selected_sort: string) {
    if (this.sortKey == selected_sort) {
      this.reverse = !this.reverse;
    } else {
      this.sortKey = selected_sort; //to sort in string for checking purpose
      this.sortPath = selected_sort.split('.');
      this.reverse = false;
    }
  }

  getDepartmentName(id: number) {
    let sel_department = this.departmentList.find(item => item.departmentId === id);
    if (sel_department) {
      return sel_department.departmentName;
    }
    return null;
  }

}

export interface Employee {
  userId: number;
  name: EmployeeName;
  age: number;
  departmentId: number;
  phone: string;
  nationality: string;
  registeredDate: Date;
  isAccountActive: boolean;
}

export interface EmployeeName {
  first: string;
  last: string;
}

interface Department {
  departmentId: number;
  departmentName: string;
}
