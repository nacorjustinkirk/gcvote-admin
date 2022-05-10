import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  gcvote: string = 'assets/gcvote.png';
  adminData: any = [];

  constructor(private session: SessionService) { }

  ngOnInit(): void {
    // this.adminData = this.session.decodeData(0);

    // console.log(this.adminData)
  }

}
