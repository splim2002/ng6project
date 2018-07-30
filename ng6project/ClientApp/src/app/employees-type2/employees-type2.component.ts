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
    this.employeesObservable$ = this.dataSvc.getAllEmployees(this._selDepartmentId, this.searchKeyword);
  }
  //Filter Property (get/set): Search Keyword
  private _searchKeyword: string = null;
  get searchKeyword(): string {
    return this._searchKeyword;
  }
  set searchKeyword(value: string) {
    this._searchKeyword = value;
    this.employeesObservable$ = this.dataSvc.getAllEmployees(this.selDepartmentId, this._searchKeyword);
  }

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    //Prepare Employee List
    this.employeesObservable$ = this.dataSvc.getAllEmployees(this.selDepartmentId, this.searchKeyword);
    //Prepare Department list
    this.dataSvc.getDepartments()
      .subscribe(result => {
        this.departmentList = result.departments;
      }, err => {
        console.log('dataSvc.getDepartments ERROR!');
      });
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

}




