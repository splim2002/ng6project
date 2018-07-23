import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProductComponent } from './product/product.component';
import { Error404Component } from './_shared/error404/error404.component';
import { LayoutDefaultComponent } from './_shared/layout-default/layout-default.component';
import { LayoutProfileComponent } from './_shared/layout-profile/layout-profile.component';

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
    LayoutProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      //Site routes goes here 
      {
        path: '',
        component: LayoutDefaultComponent,
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full' },
          { path: 'counter', component: CounterComponent }
        ]
      },
      {
        path: '',
        component: LayoutProfileComponent,
        children: [
          { path: 'fetch-data', component: FetchDataComponent }
        ]
      },
      //no layout routes
      { path: '**', component: Error404Component },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
