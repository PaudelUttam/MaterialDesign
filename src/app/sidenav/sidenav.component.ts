import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  show: boolean = true;
  menuList: any;
  displayMenu= false;
  currentRole: any;

  constructor(private authServic: AuthService) { }

  ngOnInit(): void {
    this.authServic.updateMenu.subscribe(res=>{
      this.loadMenu();
    })
   this.loadMenu();
  }
  loadMenu(){
    if(this.authServic.getToken() != ''){
      this.currentRole = this.authServic.getRoleByToken(this.authServic.getToken());
      this.authServic.getMenuByRoleId(this.currentRole).subscribe(result=>{
        this.menuList = result;
      })
    }
  }
  showPage() {
    this.show = false;
  }
}
