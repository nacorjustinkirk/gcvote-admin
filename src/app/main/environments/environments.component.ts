import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddEnvironmentComponent } from 'src/app/dialogs/add-environment/add-environment.component';
import { EnvironmentDetailsComponent } from 'src/app/dialogs/environment-details/environment-details.component';
import { DataService } from 'src/app/services/data.service';
import { department } from './../../services/offerings.service';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {

  envData: any = [];
  department = department;
  key: any = this.route.snapshot.paramMap.get('id');

  constructor(
    public dialog: MatDialog,
    private data: DataService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.data.apiRequest('/getenv', { "adminid_fld": this.key })
    .subscribe((res: any) => {
        this.envData = res.payload;
    });
  }

  getDepartmentName(code: string) {
    return this.department.find(x => x.depCode === code)?.depName;
  }

  addEnvironment(data: any){
    const dialogRef = this.dialog.open(AddEnvironmentComponent, {
      width: '600px',
      data: {
        key: data
      }
    });
  }

  environmentDetails(){
    const dialogRef = this.dialog.open(EnvironmentDetailsComponent, {
      width: '600px',
    });
  }
}