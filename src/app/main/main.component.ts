import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { AccountSettingsComponent } from '../dialogs/account-settings/account-settings.component';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  gcvote: string = 'assets/gcvote.png';
  adminData: any = [];

  constructor(
    private session: SessionService,
    private route:Router,
    public dialog: MatDialog,
    private dataService: DataService
    ) { }


  ngOnInit(): void {
    // this.adminData = this.session.decodeData(0);

    // console.log(this.adminData)

    this.getAdminData();
  }
  
  logoutAccount() {
    
    this.session.setSession(null, false);
   this.route.navigate(['login']);
  }

  accountSettings() {
      const dialogRef = this.dialog.open(AccountSettingsComponent, {
        width: '600px',
      });
    }

    getAdminData() {
      this.dataService.apiRequest('/getadmin', {}).subscribe(
        (data: any) => {
          this.adminData = data;
          console.log(this.adminData);
        }
      )
    }
      
}
