import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router, NavigationStart } from '@angular/router';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // imports: [MDBBootstrapModule.forRoot()]
})
export class AppComponent  {
  // clickFnc(){
  mainContent : string | null = '';
}
