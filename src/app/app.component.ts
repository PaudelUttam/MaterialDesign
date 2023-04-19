import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  @ViewChild(MatSidenav) sidenav! : MatSidenav

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngAfterViewInit(): void {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((res)=>{
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
        this.sidenav.autoFocus = true;
      }
    })
  }
}
