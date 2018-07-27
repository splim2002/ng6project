import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employees/employees.component';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-employees-type2',
  templateUrl: './employees-type2.component.html',
  styleUrls: ['./employees-type2.component.scss']
})
export class EmployeesType2Component implements OnInit {

  private employeesObservable$: Observable<Employee[]>;

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    this.employeesObservable$ = this.dataSvc.getEmployeesType2();
  }

}




