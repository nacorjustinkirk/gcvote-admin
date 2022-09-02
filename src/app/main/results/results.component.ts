import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  envData: any = [];

  constructor(private data: DataService, private route: Router) { }

  ngOnInit(): void {
    this.data.apiRequest('/getenv', { "adminid_fld": null })
    .subscribe((res: any) => {
        this.envData = res.payload;
    }); 
  }

  external(id: any) {
    const url = this.route.serializeUrl(
      this.route.createUrlTree(['/votes', id])
    );

    window.open(url, '_blank');
  }

  dateString(date: any) {
    return new Date(date).toDateString().split(' ').slice(1).join(' '); 
  }
  
}
