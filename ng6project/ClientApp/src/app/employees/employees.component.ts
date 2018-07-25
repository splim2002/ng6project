import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';

//Pipe
import { FilterByNamePipe } from '../filter-by-name.pipe';
import { OrderByPipe } from '../order-by.pipe';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {

  public employeeList: Employee[];
  public sortKey: string = 'nationality';
  public reverse: boolean = false;

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

  sortby(selected_sort) {
    if (this.sortKey == selected_sort) {
      this.reverse = !this.reverse;
    } else {
      this.sortKey = selected_sort;
      this.reverse = false;
    }
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
