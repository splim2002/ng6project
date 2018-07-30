# test-core2.1-mvc-angular5to6

1)Project settings:
- .NET Core 2.1 + Angular 

——————————————————————————————————————————————————————
Updates:
#(1) Upgrade Angular 5 to 6
Refer to this article: http://www.talkingdotnet.com/upgrade-angular-5-app-angular-6-visual-studio-2017/


========
My CMD in this project
========
Open CommandLine
> npm install @angular/cli@latest -g
> cd ClientApp
> npm i @angular/cli
> ng update @angular/cli
	- angular-cli.json (for angular5) is deleted and angular.json (for angular6) is created.
	- if angular.json is not found at first run, give it a second try.
> ng update @angular/core
> ng update
	- to identify and update other dependencies

##Angular 6 now depends on TypeScript 2.7 and RxJS 6. So, we need to upgrade RxJS. You would be already thinking about making the code changes manually everywhere RxJS imports and operators are used. Don’t worry, there’s a package that takes care of this. Run the following commands to upgrade RxJS.
> npm install -g rxjs-tslint
> npm install rxjs-compat --save
	- install rxjs-compat as it doesnt exist in the package.json
> rxjs-5-to-6-migrate -p src/tsconfig.app.json
> npm uninstall rxjs-compat
	- remove rxjs-compat. This package is required to get backwards compatibility with RxJS previous to version 6.

> ng serve
	- remove --extractCss in package.json > "scripts"
> ng build
	- build again

====================================================
#(2) Upgrade bootstrap from version 3 to 4
#(2.1)
@CMD ==> C:\projects\ng6project\ng6project
>npm view bootstrap
	- check current latest version
>npm i bootstrap@latest
	- install the latest version
>ng build

**You can see existing HTML & CSS and not compatible with Bootstrap 4. Hence, need to update HTML code
- sample: https://getbootstrap.com/docs/4.0/components/navbar/

**Noted:
- font icon 'glyphicon' is no longer available in bootstrap 4 package. 

====================================================
#(3) Change output path
3.1 Update 'configuration.RootPath' in Startup.cs
3.2 Update 'outputPath' in ClientApp/angular.json
3.3 Delete ClientApp/dist (previous output path)
3.4 Run 'ng build' at CMD

====================================================
#(4) Create component
#(4.1) use command line to create component
>ng generate component product

*Note:
If got error: 
Could not find an NgModule. Use the skip-import option to skip importing in NgModule.
Try this solution: (Refer to wwwroot/tutorial/004.1.png)
> cd src/app
And the run the '>ng generate component product' again

====================================================
#(5) Add font icon, here we use 'Font-Awesome'
npm package: https://www.npmjs.com/package/@fortawesome/fontawesome
Office URL: https://fontawesome.com/how-to-use/on-the-web/setup/getting-started?using=web-fonts-with-css
installation reference: https://stackoverflow.com/questions/48184079/include-fortawesome-fontawesome-to-angular-cli-project

#(5.1) Installing Webpack from NPM
@CMD
>npm i @fortawesome/fontawesome-free

#(5.2) Importing the CSS
- Configure angular.json (refer to link), OR
- Import directly in src/style.css or src/style.scss

====================================================
#(6) Error 404 page
- when a route is not exist, system will display error404 

====================================================
#(7) Implement Multiple Layouts
- Customize layouts for different pages at router

Reference Link: https://stackblitz.com/edit/angular-multi-layout-example?file=app%2Fapp.routing.ts

====================================================
#(8) Tidy up router
- when more components (page) added, router setting becomes bigger. Hence, instead of place it in app.module.ts, we can split it out as another component/constant

Reference Links:
- https://angular.io/tutorial/toh-pt5#routermoduleforroot
- (export as component) https://www.sitepoint.com/component-routing-angular-router/ 
- (export as constant) https://www.js-tutorials.com/javascript-tutorial/multiple-layout-angular-4-or-5-using-bootstrap-template/

====================================================
#(9) Login page
#(9.1)Create Login component 
>ng generate component login

#(9.2) Create a Service called 'DataService' to folder src/app/_service
>ng g service data

#(9.3) Add login validation at LayoutProfileComponent
- So it applied to any components that under LayoutProfileComponent
- When is not login, page redirect to Login Page (Login Component)

#(9.4) Bind form

#(9.5) Add Validation
- Add 'novalidate' to form to prevent browser (e.g. HTML5) validation
[Work File]:
- ng6project\ClientApp\src\app\login\login.component.html

#(9.6) (Backend) Add API 'CreateToken' & (Frontend) Call the API
- Backend: This is a temporary login method as this tutorial is focusing on frontend (Angular). 
	- No database to validate login credential and hard code token.
	- Set token expiry after 1 day.
- Frontend: Call the API 'CreateToken' and redirect to fetch-data page when login successfully

[Work File]:
- ng6project/Controllers/SampleDataController.cs
- ng6project/ViewModels/LoginViewModel.cs
- ng6project/ClientApp/src/app/_services/data.service.ts
- ng6project/ClientApp/src/app/login/login.component.ts

====================================================
#(10) Customize layout
#(10.1) Add sidebar menu
>ng g component sideMenu
& move component into src/app/_shared

#(10.2) Add global SCSS
- add src/scss/_color.scss to define variables
- access Global Variables (in _color.scss) in components scss

[Work File]:
- ng6project/ClientApp/src/scss/_color.scss
- ng6project/ClientApp/src/app/_shared/side-menu/side-menu.component.scss (Use @import)

#(10.3) Add profile component
- Move '/fetch-data' page to LayoutDefaultComponent, so that login is no longer required when access that page.
- Instead, apply 'login' to profile & redirect to profile page after login successfully.

[Work File]:
- ng6project/ClientApp/src/app/app-routing.module.ts
- ng6project/ClientApp/src/app/login/login.component.ts

#(10.4)
- Make layout full height
- Output: (Refer to wwwroot/tutorial/010.4.png)

====================================================
#(11) Play with sample Data
#(11.1) List data
- List out data from sample JSON file
- Use DataService to get the JSON file data

==> (IMPORTANT) how to set base_url
Reference: http://www.projectcodify.com/angular-set-base-url-dynamically

#(11.1.1) Add component "Employees"
- Create component Employees 
	>ng g component employees 
- Add to router & sidebar menu

#(11.1.2) Get Data from Json
- Call getEmployees() method (from DataService.ts)
- Display json data at the page (Refer to wwwroot/tutorial/011.1.2.png)

==> ngFor
Reference: https://coryrylan.com/blog/angular-ng-for-syntax

#(11.1.3) Filter (By using PIPES)
- Create pipe "filterByName" 
	>ng g pipe filterByName
==> Reference: 
- https://codeburst.io/create-a-search-pipe-to-dynamically-filter-results-with-angular-4-21fd3a5bec5c
- https://angular.io/guide/pipes

#(11.1.4) Dynamic Sorting (Using PIPES)
- Create pipe "OrderBy" 
	>ng g pipe orderBy
- Refer to image wwwroot/tutorial/011.1.4.png - sort by Registered Date

==> Reference:
- https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript
- https://stackoverflow.com/questions/36816788/how-do-i-call-an-angular-2-pipe-with-multiple-arguments
- https://stackoverflow.com/questions/49107215/how-to-sort-array-of-objects-in-descending-order-in-angular 

#(11.1.4.2) Custom Pipe for 'Employee' to sort by Firstname (multi-layer JSON data)
- Create SortingEmployeesPipe to create custom sorting for Employee.  
	>ng g pipe sortingEmployees
- Refer to image wwwroot/tutorial/011.1.4.2.png - sort by FirstName
- Create folder src/app/_pipe to store all the custom Pipes
- NOTE: This is incomplete demo. You will find the sorting is not working when apply filtering. Solution is in next commit.
==> Reference: https://blog.xmltravelgate.com/sorting-with-pipes-in-angular-2-7370b0839468

#(11.1.4.2.2) Solution to fix sorting when apply filtering
- adding a '[...]' save the world :)


#(11.1.5) PIPE (such as currencyPipe, lowercase/uppercase)
- Add salary column
- Use currency pipe

==> Reference:
- CurrencyPipe: https://angular.io/api/common/CurrencyPipe
- DatePipe: https://angular.io/api/common/DatePipe 


#(11.1.6) With Department data
#(11.1.6.1) Display Department Name - Bind data from another json data
- use HttpClient to get json data @[ng6project/ClientApp/src/app/_services/data.service.ts]
- add interface EmployeeName
- add method getDepartmentName()

#(11.1.6.2) Add department dropdown list
Reference => https://blog.kevinchisholm.com/angular/get-value-selected-dropdown-menu-item/

#(11.1.6.3) Add department filter
- We have 2 methods, first, amend the FilterByNamePipe to add the department filtering. But actually it's not a good idea to do filtering by using PIPE bcz performance is poor & to prevent aggressive minification. Angular recommends to move filter & sorting to component.
- I keep the 'filterByName : searchText' in [employees.component.html] and you can see it works with department filtering. But you may notice that the total result (in line 17) reflects the total count of department filtering only. I'm going to move FilterByNamePipe to component.

#(11.1.6.4) Move keyword filter to component, stop using FilterByNamePipe
- Change to use 'searchKeyword' & create property accordingly. @[ng6project/ClientApp/src/app/employees/employees.component.ts]
- Update 'performFilter' method
- Keyword search applies to FirstName, Lastname, Nationality & Age. 
	- Note: Need to convert age which is 'number' to string as the searchKeyword is 'String' type.
- Use 'toLocaleLowerCase()' to prevent case sensitive upon keyword search
- Total result reflects correctly at keyword & department filtering. Display 'No employees' when result is empty.
- Add 'Clear search' button and 'clearKeyword' method
- Beautify form layout

Noted: What is toLocaleLowerCase() and why:
--> The toLocaleLowerCase() method returns the value of the string converted to lower case according to any locale-specific case mappings. toLocaleLowerCase() does not affect the value of the string itself. In most cases, this will produce the same result as toLowerCase(), but for some locales, such as Turkish, whose case mappings do not follow the default case mappings in Unicode, there may be a different result.

#(11.1.6.5) [(ngModel)] and (ngModelChange)="updateDepartmentFilter($event)"
- Do you know ngModel can trigger the changes without 'ngModelChange'? Yes, use () will do.
- Change [ngModel] to [(ngModel)] and remove (ngModelChange)="updateDepartmentFilter($event)"

TIPS:
[] => Push data from component into form
() => Form itself can callback into component
Reference ==> 
- https://angular.io/guide/template-syntax#two-way-binding---
- https://angular.io/guide/template-syntax#ngmodel---two-way-binding-to-form-elements-with-ngmodel


#(11.2) Use Observable & Async
- Create new component "EmployeesType2"
	> ng g c employeesType2

#(11.2.1) Use Observable method to load JSON data
- Add new json data @[ng6project/ClientApp/src/assets/data/employee-list-type2.json]. 
	- Note: structure is different. Remove attribute 'employees'
- Add method 'getEmployeesType2()' to DataService @[ng6project/ClientApp/src/app/_services/data.service.ts]

Reference ==> 
- http://javasampleapproach.com/frontend/angular/angular-6/angular-6-service-with-observable-data-for-asynchronous-operation
- https://auth0.com/blog/making-use-of-rxjs-angular/

#(11.2.1.2) How to get employees data only if JSON data structure is like employee-list.json @[ng6project/ClientApp/src/assets/data/employee-list.json]
- Use 'Map'!
Reference => 
- https://stackoverflow.com/questions/40100530/angular-2-how-to-use-observable-filter
- https://www.reddit.com/r/Angular2/comments/7gmegs/angular_5_httpclient_the_pipe_method/ 
- https://blog.angularindepth.com/rxjs-understanding-lettable-operators-fe74dda186d3

#(11.2.2) Add filtering to observable data
- Apply filtering (case sensitive) by using map & filter @[ng6project/ClientApp/src/app/_services/data.service.ts]
- Add methods: clearKeyword(), getDepartmentName() to EmployeesType2Component
Reference => 
- https://stackoverflow.com/questions/43430715/angular-filter-observable-array/43430835
- https://stackoverflow.com/questions/50769477/angular-6-filter-json

#(11.2.3) Add sorting to observable data
- Refer to SortingEmployeesPipe's sorting code
- Create a shared component (directive) for sortable table header
	>ng g c sortingStyle1

Reference => https://stackoverflow.com/questions/50275834/how-do-you-sort-an-observableitem-in-angular-6-with-rxjs-6

#(11.2.4) Total Observable Data Count
Reference => https://stackoverflow.com/questions/38057537/how-to-check-the-length-of-an-observable-array

- Show 'No employees' when no data match
====================================================
