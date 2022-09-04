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
    this.dataService.apiRequest('/getadmin', {
      stud_no: sessionStorage.getItem('username'),
      signature: sessionStorage.getItem('raw'),
      payload: {
        adminid_fld: sessionStorage.getItem('userid'),
      }
    })
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
