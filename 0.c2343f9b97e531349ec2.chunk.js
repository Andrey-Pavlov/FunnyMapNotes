webpackJsonp([0],{724:function(e,t,o){"use strict";var l=o(74),n=o(195),u=o(0),a=o(143),r=o(726);console.log("`Detail` bundle loaded asynchronously"),t.routes=[{path:"",component:r.Detail,pathMatch:"full"}];var i=function(){function AboutModule(){}return AboutModule.routes=t.routes,AboutModule=__decorate([u.NgModule({declarations:[r.Detail],imports:[l.CommonModule,n.FormsModule,a.RouterModule.forChild(t.routes)]}),__metadata("design:paramtypes",[])],AboutModule)}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},726:function(e,t,o){"use strict";var l=o(0),n=function(){function Detail(){}return Detail.prototype.ngOnInit=function(){console.log("hello `Detail` component")},Detail=__decorate([l.Component({selector:"detail",template:"\n    <h1>Hello from Detail</h1>\n    <router-outlet></router-outlet>\n  "}),__metadata("design:paramtypes",[])],Detail)}();t.Detail=n}});