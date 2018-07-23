//import { Injectable } from '@angular/core';

//@Injectable({
//  providedIn: 'root'
//})
export class DataService {

  constructor() { }

  private token: string = "";
  private tokenExpriration: Date;

  public get loginRequired(): boolean {
    return this.token.length == 0 || this.tokenExpriration > new Date();
  }
  
}
