import { Component, OnInit } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private data: DataService, private router: Router) { }

  public creds = {
    username: '',
    password: ''
  }
  errorMessage: string = "";

  onLogin() {
    //Call login service
    console.log('onlogin', this.creds.username);

    this.data.login(this.creds)
      .subscribe(success => {
        if (success) {
          //redirect
          this.router.navigate(["/fetch-data"]);
        } 
      }, err => this.errorMessage = 'Login Failed');
  }

}
