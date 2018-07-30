import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeName, Department } from '../employees/employees.component';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-employees-type2',
  templateUrl: './employees-type2.component.html',
  styleUrls: ['./employees-type2.component.scss']
})
export class EmployeesType2Component implements OnInit {

  private employeesObservable$: Observable<Employee[]>;
  private departmentList: Department[];

  //Filter Property (get/set): Department Id
  private _selDepartmentId: number = 0;
  get selDepartmentId(): number {
    return this._selDepartmentId;
  }
  set selDepartmentId(value: number) {
    this._selDepartmentId = value;
    this.updateEmployeeList();
  }
  //Filter Property (get/set): Search Keyword
  private _searchKeyword: string = null;
  get searchKeyword(): string {
    return this._searchKeyword;
  }
  set searchKeyword(value: string) {
    this._searchKeyword = value;
    this.updateEmployeeList();
  }

  //Sorting
  private sortKey: string = 'name.first';
  private sortPath: string[] = this.sortKey.split('.');
  private reverse: boolean = false;

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    //Prepare Employee List
    this.updateEmployeeList();
    //Prepare Department list
    this.dataSvc.getDepartments()
      .subscribe(result => {
        this.departmentList = result.departments;
      }, err => {
        console.log('dataSvc.getDepartments ERROR!');
      });
  }

  private updateEmployeeList() {
    this.employeesObservable$ = this.dataSvc.getAllEmployees(this.selDepartmentId, this.searchKeyword, this.sortPath, this.reverse);
  }

  clearKeyword() {
    this.searchKeyword = null;
  }

  getDepartmentName(id: number) {
    let sel_department = this.departmentList.find(item => item.departmentId === id);
    if (sel_department) {
      return sel_department.departmentName;
    }
    return null;
  }

  sortby(selected_sort: string) {
    if (this.sortKey == selected_sort) {
      this.reverse = !this.reverse;
    } else {
      this.sortKey = selected_sort; //to sort in string for checking purpose
      this.sortPath = selected_sort.split('.');
      this.reverse = false;
    }

    this.updateEmployeeList();
  }

}




