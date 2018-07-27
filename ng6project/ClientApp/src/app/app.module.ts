import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Route
import { appRouting } from './app-routing.module';
//Services
import { DataService } from './_services/data.service';

//Pipe
import { FilterByNamePipe } from './_pipe/filter-by-name.pipe';
import { OrderByPipe } from './_pipe/order-by.pipe';
import { SortingEmployeesPipe } from './_pipe/sorting-employees.pipe';

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

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProductComponent,
    Error404Component,
    LayoutDefaultComponent,
    LayoutProfileComponent,
    LoginComponent,
    SideMenuComponent,
    ProfileComponent,
    EmployeesComponent,
    FilterByNamePipe,
    OrderByPipe,
    SortingEmployeesPipe,
    EmployeesType2Component
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    appRouting
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
