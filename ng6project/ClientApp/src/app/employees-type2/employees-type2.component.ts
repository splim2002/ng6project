import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, EmployeeName, Department } from '../employees/employees.component';
import { DataService } from '../_services/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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

  constructor(private dataSvc: DataService, private myRoute: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    //Get router param
    this.activatedRoute.queryParams.subscribe((qParams: Params) => {
      //console.log('activatedRoute.queryParams');
      if (qParams['kw']) {
        this.searchKeyword = qParams['kw'];
      }
      if (qParams['dp']) {
        this.selDepartmentId = parseInt(qParams['dp']);
      }
      //sorting
      //if (qParams['sk']) { 
      //  this.sortKey = qParams['sk'];
      //  this.sortPath = this.sortKey.split('.');
      //}
      //if (qParams['sd']==1) {
      //  this.reverse = true;
      //}
    });

    //Prepare Department list
    this.dataSvc.getDepartments()
      .subscribe(result => {
        this.departmentList = result.departments;
      }, err => {
        console.log('dataSvc.getDepartments ERROR!');
      });

    //Prepare Employee List
    this.employeesObservable$ = this.dataSvc.getAllEmployees(this.selDepartmentId, this.searchKeyword, this.sortPath, this.reverse);

  }

  private updateEmployeeList() {
    this.employeesObservable$ = this.dataSvc.getAllEmployees(this.selDepartmentId, this.searchKeyword, this.sortPath, this.reverse);

    //Update URL route
    this.myRoute.navigate(['/employee-list-2'], {
      queryParams: {
        kw: this.searchKeyword,
        dp: this.selDepartmentId,
        //sk: this.sortKey,
        //sd: (this.reverse)?1:0
      }
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




