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

  employeeList: Employee[];
  filteredEmployeeList: Employee[] = [];
  //Department
  departmentList: Department[] = [];
  //Sorting
  public sortKey: string = 'name.first';
  public sortPath: string[] = this.sortKey.split('.');
  public reverse: boolean = false;

  //Filter Property (get/set)
  private _selDepartmentId: number = 0;
  get selDepartmentId(): number {
    return this._selDepartmentId;
  }
  set selDepartmentId(value: number) {
    this._selDepartmentId = value;
    this.filteredEmployeeList = this.performFilter();
  }

  constructor(private dataSvc: DataService) {}

  ngOnInit() {
    this.dataSvc.getEmployees()
      .subscribe(result => {
        this.employeeList = result.employees;
        this.filteredEmployeeList = this.performFilter();
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

  updateDepartmentFilter(sel_department: number) {
    this.selDepartmentId = sel_department;
  }

  performFilter(): Employee[] {
    if (this.selDepartmentId == 0) {
      return this.employeeList;
    }
    return this.employeeList.filter((item: Employee) => {
      return item.departmentId === this.selDepartmentId
    });
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
