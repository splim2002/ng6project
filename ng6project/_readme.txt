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

- Create component Employee 
	>ng g component employees 
- Add to router & sidebar menu

====================================================