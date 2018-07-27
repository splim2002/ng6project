import { RouterModule, Routes } from '@angular/router';

//Component (Share)
import { LayoutDefaultComponent } from './_shared/layout-default/layout-default.component';
import { LayoutProfileComponent } from './_shared/layout-profile/layout-profile.component';
import { SideMenuComponent } from './_shared/side-menu/side-menu.component';
import { Error404Component } from './_shared/error404/error404.component';

//Component (Main)
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesType2Component } from './employees-type2/employees-type2.component';

const appRoutes: Routes = [
  //Site routes goes here 
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'employee-list', component: EmployeesComponent },
      { path: 'employee-list-2', component: EmployeesType2Component }
    ]
  },
  {
    path: '',
    component: LayoutProfileComponent,
    children: [
      { path: 'profile', component: ProfileComponent }
    ]
  },
  //no layout routes
  { path: 'login', component: LoginComponent },
  { path: '**', component: Error404Component }
];

export const appRouting = RouterModule.forRoot(appRoutes);
