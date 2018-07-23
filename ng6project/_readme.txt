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