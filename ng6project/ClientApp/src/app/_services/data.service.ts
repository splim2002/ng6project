import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()

//@Injectable({
//  providedIn: 'root'
//})
export class DataService {

  constructor(private http: HttpClient) { }

  //LOGIN
  private token: string = "";
  private tokenExpiration: Date;

  public get loginRequired(): boolean {
    return this.token.length == 0 || this.tokenExpiration > new Date();
  }

  //LOGIN
  login(creds): Observable<boolean> {
    return this.http
      .post('api/SampleData/CreateToken', creds)
      .map((data: any) => {
        this.token = data.token;
        this.tokenExpiration = data.expiration;
        return true;
      });
  }

}
