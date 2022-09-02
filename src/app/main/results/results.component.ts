import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  envData: any = [];
  key: any = this.router.snapshot.paramMap.get('id');

  constructor(private data: DataService, private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.data.apiRequest('/getenvadmin', { "adminid_fld": this.key })
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
