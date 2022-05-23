import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  gcvote: string = 'assets/gcvote.png';
  adminData: any = [];
  token: any = '';

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    var data:any = this.sessionService.getSessionData();
    this.token = this.sessionService.decodeData(data);

    this.dataService.apiRequest('/getadmin', { "adminid_fld": this.token.uid })
    .subscribe((res: any) => {
      this.adminData = res.payload[0];
    })
  }
  
  logoutAccount() {
    this.sessionService.deleteData();
    this.adminData = null;
    this.router.navigate(['/login'])
    .then(() => {
      window.location.reload();
    });
  }

}
