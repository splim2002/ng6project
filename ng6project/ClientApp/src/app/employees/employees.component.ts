import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

//@Inject('BASE_URL') baseUrl: string;
export class EmployeesComponent implements OnInit {

  constructor(private dataSvc: DataService) {
  }

  ngOnInit() {
    this.dataSvc.getEmployees();
    //this.httpClient.get<any>(baseUrl + 'assets/data/employee-list.json')
    //  .subscribe(result => {
    //    this.employees = result.employees;
    //    this.departments = result.departments;
    //  });

    //httpClient.get<Employee[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
    //  this.forecasts = result;
    //}, error => console.error(error));
  }

}


interface Employee {

}
