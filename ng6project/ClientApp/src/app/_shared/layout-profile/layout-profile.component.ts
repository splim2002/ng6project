import { Component, OnInit } from '@angular/core';
import { DataService } from '../../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-profile',
  templateUrl: './layout-profile.component.html',
  styleUrls: ['./layout-profile.component.scss']
})
export class LayoutProfileComponent implements OnInit {

  constructor(public data: DataService, private router: Router) {
    if (data.loginRequired) {
      //Force Login
      this.router.navigate(['login']);
    } else {
      console.log('Is login');
    }
  }

  ngOnInit() {
  }

}
